/**
 * Climate feelings survey (COP31). The page itself is static HTML in
 * public/anket/; this file holds what the API route needs to check answers and
 * build the summary the results screen draws.
 *
 * The Google Sheet behind the Apps Script web app is the main record: the
 * printed QR codes from before the site had this page still post there
 * directly. Supabase keeps a second copy of every answer sent through the site.
 */

export const SURVEY_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwOfDTtTCbyFaJj3Msq7JZ31fLILaAeBzddVpjJPKILjhPb_L4XQm-I0rGJIAZgfLVh/exec";

export const FEELINGS = ["pessimism", "fear", "helplessness", "anxiety", "anger", "guilt"] as const;
export type Feeling = (typeof FEELINGS)[number];

const AGE_GROUPS = [
  [0, 17, "0–17"],
  [18, 24, "18–24"],
  [25, 34, "25–34"],
  [35, 44, "35–44"],
  [45, 54, "45–54"],
  [55, 64, "55–64"],
  [65, 200, "65+"],
] as const;

export type SurveyAnswer = { age: number; feeling: Feeling; poster: Feeling | null; locale: "tr" | "en" };

/** Same shape as sonuclar() in the Apps Script, so the page doesn't care which one answered. */
export type SurveySummary = {
  toplam: Record<Feeling, number>;
  gruplar: ({ etiket: string; sayi: number } & Record<Feeling, number>)[];
  kisi: number;
  ortYas: number | null;
};

export function isFeeling(value: unknown): value is Feeling {
  return typeof value === "string" && (FEELINGS as readonly string[]).includes(value);
}

/** Returns null when the answer isn't one the survey could have produced. */
export function parseAnswer(body: unknown): SurveyAnswer | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  const age = Math.floor(Number(b.yas));
  if (!(age >= 1 && age <= 120) || !isFeeling(b.duygu)) return null;
  return {
    age,
    feeling: b.duygu,
    poster: isFeeling(b.poster) ? b.poster : null,
    locale: b.dil === "en" ? "en" : "tr",
  };
}

function zeroCounts(): Record<Feeling, number> {
  return Object.fromEntries(FEELINGS.map((f) => [f, 0])) as Record<Feeling, number>;
}

export function summarize(rows: { age: number; feeling: string }[]): SurveySummary {
  const toplam = zeroCounts();
  const gruplar = AGE_GROUPS.map(([, , etiket]) => ({ etiket, sayi: 0, ...zeroCounts() }));
  let kisi = 0;
  let ageSum = 0;

  for (const { age, feeling } of rows) {
    if (!isFeeling(feeling) || !(age >= 1)) continue;
    toplam[feeling]++;
    kisi++;
    ageSum += age;
    const i = AGE_GROUPS.findIndex(([min, max]) => age >= min && age <= max);
    if (i >= 0) {
      gruplar[i][feeling]++;
      gruplar[i].sayi++;
    }
  }

  return { toplam, gruplar, kisi, ortYas: kisi ? Math.round((ageSum / kisi) * 10) / 10 : null };
}

export function isSummary(value: unknown): value is SurveySummary {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.kisi === "number" && typeof v.toplam === "object" && Array.isArray(v.gruplar);
}
