"use server";

import {
  INTEREST_VALUES,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A human can't read the form and type a message this fast. */
const MIN_FILL_MS = 2500;

/** Messages one email address can leave per hour before the rest are dropped. */
const MAX_PER_HOUR = 3;

/** Messages older than this are deleted (see the privacy page). */
const RETENTION_MS = 365 * 24 * 60 * 60 * 1000;

const MESSAGES: Record<
  Locale,
  {
    sent: string;
    name: string;
    email: string;
    interest: string;
    message: string;
    fix: string;
    failed: string;
    notConnected: string;
  }
> = {
  en: {
    sent: "Got it. Someone on the team will write back within a few days.",
    name: "Need a name.",
    email: "That email doesn't look right.",
    interest: "Pick one.",
    message: "Say something, even one line.",
    fix: "A few things need fixing.",
    failed: site.contact.email
      ? `Couldn't send that. Email us at ${site.contact.email}.`
      : "Couldn't send that. Message us on Instagram, @team_6874.",
    notConnected:
      "Form isn't connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the dev server.",
  },
  tr: {
    sent: "Aldık. Takımdan biri birkaç gün içinde size dönecek.",
    name: "Bir isim gerekli.",
    email: "Bu e-posta adresi doğru görünmüyor.",
    interest: "Birini seçin.",
    message: "Bir şeyler yazın, tek satır bile olur.",
    fix: "Düzeltilmesi gereken birkaç şey var.",
    failed: site.contact.email
      ? `Gönderilemedi. Bize ${site.contact.email} adresinden yazın.`
      : "Gönderilemedi. Instagram'dan yazın: @team_6874.",
    notConnected:
      "Form henüz bağlı değil. .env.local dosyasına SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY ekleyip geliştirme sunucusunu yeniden başlatın.",
  },
};

function field(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = formData.get("locale");
  const t = MESSAGES[isLocale(locale) ? locale : "en"];

  // Bots fill the hidden field, post without the timestamp the page sets, or
  // submit instantly. Report success and store nothing.
  if (field(formData, "company_website", 200)) return { status: "success", message: t.sent };
  const startedAt = Number(formData.get("started_at"));
  if (!(startedAt > 0) || Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: t.sent };
  }

  const values: ContactValues = {
    name: field(formData, "name", 120),
    email: field(formData, "email", 254),
    interest: field(formData, "interest", 20),
    message: field(formData, "message", 4000),
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (!values.name) errors.name = t.name;
  if (!values.email || !EMAIL.test(values.email)) errors.email = t.email;
  if (!(INTEREST_VALUES as readonly string[]).includes(values.interest ?? "")) errors.interest = t.interest;
  if (!values.message) errors.message = t.message;

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: t.fix, errors, values };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn("[contact] Supabase isn't configured; message not stored.");
    return {
      status: "error",
      values,
      message: process.env.NODE_ENV === "production" ? t.failed : t.notConnected,
    };
  }

  // Someone (or something) sending again and again: keep answering, stop storing.
  const { count } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("email", values.email)
    .gte("created_at", new Date(Date.now() - 60 * 60 * 1000).toISOString());
  if ((count ?? 0) >= MAX_PER_HOUR) return { status: "success", message: t.sent };

  // Only what's needed to reply. The privacy notice promises nothing else is kept.
  const { error } = await supabase.from("contact_messages").insert({
    name: values.name,
    email: values.email,
    interest: values.interest,
    message: values.message,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return { status: "error", values, message: t.failed };
  }

  // The privacy notice says messages are deleted after 12 months.
  const cutoff = new Date(Date.now() - RETENTION_MS).toISOString();
  const { error: pruneError } = await supabase.from("contact_messages").delete().lt("created_at", cutoff);
  if (pruneError) console.error("[contact] pruning old messages failed:", pruneError.message);

  return { status: "success", message: t.sent };
}
