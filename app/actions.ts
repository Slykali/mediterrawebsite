"use server";

import { headers } from "next/headers";

import {
  INTERESTS,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";
import { isDesignId } from "@/lib/designs";
import { site } from "@/lib/site";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A human can't read the form and type a message this fast. */
const MIN_FILL_MS = 2500;

const SENT = "Got it. Someone on the team will write back within a few days.";

function field(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill the hidden field or submit instantly. Tell them it worked and
  // store nothing — a visible rejection just teaches them to adapt.
  if (field(formData, "company_website", 200)) return { status: "success", message: SENT };
  const startedAt = Number(formData.get("started_at"));
  if (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: SENT };
  }

  const values: ContactValues = {
    name: field(formData, "name", 120),
    email: field(formData, "email", 254),
    interest: field(formData, "interest", 20),
    message: field(formData, "message", 4000),
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (!values.name) errors.name = "Need a name.";
  if (!values.email || !EMAIL.test(values.email)) errors.email = "That email doesn't look right.";
  if (!INTERESTS.some((option) => option.value === values.interest)) errors.interest = "Pick one.";
  if (!values.message) errors.message = "Say something, even one line.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "A few things need fixing.", errors, values };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn("[contact] Supabase isn't configured; message not stored.");
    return {
      status: "error",
      values,
      message:
        process.env.NODE_ENV === "production"
          ? `Couldn't send that. Email us at ${site.contact.email}.`
          : "Form isn't connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the dev server.",
    };
  }

  const design = String(formData.get("design") ?? "");
  const { error } = await supabase.from("contact_messages").insert({
    name: values.name,
    email: values.email,
    interest: values.interest,
    message: values.message,
    design: isDesignId(design) ? design : null,
    user_agent: (await headers()).get("user-agent")?.slice(0, 400) ?? null,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return {
      status: "error",
      values,
      message: `Couldn't send that. Email us at ${site.contact.email}.`,
    };
  }

  return { status: "success", message: SENT };
}
