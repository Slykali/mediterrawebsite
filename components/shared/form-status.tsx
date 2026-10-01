"use client";

import { createContext, useContext, type ReactNode } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { LINKS, site } from "@/lib/site";

/**
 * Whether the contact form can actually store messages. Decided on the server
 * (the Supabase keys are server-only) and handed down, so the server HTML and
 * the browser agree.
 */
const FormOpenContext = createContext(true);

export function FormStatusProvider({ open, children }: { open: boolean; children: ReactNode }) {
  return <FormOpenContext.Provider value={open}>{children}</FormOpenContext.Provider>;
}

export function useFormOpen(): boolean {
  return useContext(FormOpenContext);
}

const COPY = {
  en: {
    title: "The form isn't open yet.",
    body: "Until it is, message us on Instagram and someone on the team will answer.",
    email: "Or email",
  },
  tr: {
    title: "Form henüz açık değil.",
    body: "Açılana kadar Instagram'dan yazın, takımdan biri size dönecek.",
    email: "Ya da e-posta:",
  },
} as const;

/** Shown in place of the form when it can't store messages, instead of a form that loses them. */
export function FormClosedPanel({ className = "" }: { className?: string }) {
  const t = COPY[useLocale()];
  const instagram = LINKS.find((link) => link.label === "Instagram")!;

  return (
    <div role="note" className={`border border-rule bg-panel p-5 sm:p-6 ${className}`}>
      <p className="text-lg font-semibold">{t.title}</p>
      <p className="mt-2 max-w-xl text-base leading-snug text-mute">{t.body}</p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-base">
        <a href={instagram.href} target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">
          Instagram @team_6874
        </a>
        {site.contact.email && (
          <span className="text-mute">
            {t.email}{" "}
            <a href={`mailto:${site.contact.email}`} className="text-ink underline underline-offset-4">
              {site.contact.email}
            </a>
          </span>
        )}
      </p>
    </div>
  );
}
