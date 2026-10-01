"use client";

import { useEffect, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";

/**
 * Hidden fields the contact form carries: the page's
 * language (for the reply text), when the form was first shown (bots submit
 * instantly), and a honeypot only bots fill.
 * The timestamp is set after mount (rendering Date.now() on the server would
 * never match the client), and as the field's default, not just its value:
 * React resets the form after every submit, and a reset puts each field back
 * to its default. A plain value would come back empty and the retry would be
 * dropped as a bot.
 */
export function FormGuards() {
  const [startedAt, setStartedAt] = useState("");
  const locale = useLocale();

  useEffect(() => setStartedAt(String(Date.now())), []);

  return (
    <>
      <input type="hidden" name="locale" defaultValue={locale} />
      <input type="hidden" name="started_at" defaultValue={startedAt} />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="hp_6874" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}
