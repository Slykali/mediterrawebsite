import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  SURVEY_SCRIPT_URL,
  isSummary,
  parseAnswer,
  summarize,
  type SurveyAnswer,
  type SurveySummary,
} from "@/lib/survey";

export const dynamic = "force-dynamic";

/** Nobody reads the question and picks a feeling this fast. */
const MIN_FILL_MS = 1500;
const TIMEOUT_MS = 8000;
const TABLE = "climate_survey_responses";

async function saveToSheet(answer: SurveyAnswer): Promise<SurveySummary> {
  // text/plain keeps Apps Script from rejecting the body; it parses the JSON itself.
  const res = await fetch(SURVEY_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ yas: answer.age, duygu: answer.feeling, poster: answer.poster ?? "", dil: answer.locale }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data: unknown = await res.json();
  const sonuc = (data as { ok?: boolean; sonuc?: unknown }).sonuc;
  if (!(data as { ok?: boolean }).ok || !isSummary(sonuc)) throw new Error("sheet refused the answer");
  return sonuc;
}

async function saveToSupabase(answer: SurveyAnswer): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("supabase not configured");
  const { error } = await supabase.from(TABLE).insert(answer);
  if (error) throw error;
}

async function summaryFromSheet(): Promise<SurveySummary> {
  const res = await fetch(`${SURVEY_SCRIPT_URL}?api=sonuclar`, {
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data: unknown = await res.json();
  if (!isSummary(data)) throw new Error("sheet returned no summary");
  return data;
}

/** Backup summary when Google is down. Covers only answers sent through the site. */
async function summaryFromSupabase(): Promise<SurveySummary> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("supabase not configured");
  const { data, error } = await supabase.from(TABLE).select("age, feeling").limit(100000);
  if (error) throw error;
  return summarize(data ?? []);
}

async function summary(): Promise<SurveySummary | null> {
  try {
    return await summaryFromSheet();
  } catch {
    try {
      return await summaryFromSupabase();
    } catch {
      return null;
    }
  }
}

export async function GET() {
  const result = await summary();
  if (!result) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const answer = parseAnswer(body);
  if (!answer) return NextResponse.json({ error: "bad_answer" }, { status: 400 });

  // Too fast to be a person: answer as if it worked and store nothing.
  const elapsed = Number((body as { sure?: unknown }).sure);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
    const result = await summary();
    return NextResponse.json(result ?? summarize([]));
  }

  // Both copies at once. One of them is enough to count the answer as saved.
  const [sheet, backup] = await Promise.allSettled([saveToSheet(answer), saveToSupabase(answer)]);
  if (sheet.status === "rejected") console.error("[anket] Google Sheet write failed:", sheet.reason);
  if (backup.status === "rejected") console.error("[anket] Supabase write failed:", backup.reason);
  if (sheet.status === "rejected" && backup.status === "rejected") {
    return NextResponse.json({ error: "not_saved" }, { status: 502 });
  }

  const result = sheet.status === "fulfilled" ? sheet.value : await summary();
  return NextResponse.json(result ?? summarize([answer]));
}
