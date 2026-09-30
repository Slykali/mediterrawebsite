"use client";

import { useLocale } from "@/components/i18n/locale-provider";
import { MEMBERSHIP_CLOSED } from "@/lib/pages";

/** Shown at the top of every contact form: the team only takes students of its own school, and is full. */
export function ClosedNotice({ className = "" }: { className?: string }) {
  const t = MEMBERSHIP_CLOSED[useLocale()];

  return (
    <p role="note" className={`border-l-2 border-accent px-4 py-3 text-sm leading-relaxed ${className}`}>
      <strong className="font-semibold">{t.title}</strong> {t.body}
    </p>
  );
}
