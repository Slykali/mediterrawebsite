"use client";

import { usePathname } from "next/navigation";

import { useLocale } from "@/components/i18n/locale-provider";
import { LOCALES, localePath, splitLocale } from "@/lib/i18n";
import { CHROME } from "@/lib/pages";

/**
 * EN / TR. Inherits the type and colour of whatever header it sits in, so it
 * fits any header; the inactive language is just dimmed. Plain <a>, not
 * <Link>: switching language needs a full load so <html lang> changes too.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const { path } = splitLocale(usePathname());

  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden className="opacity-40">
              /
            </span>
          )}
          {l === locale ? (
            <span aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <a
              href={localePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-label={`${l.toUpperCase()}: ${CHROME[locale].switchLabel}`}
              className="opacity-50 transition-opacity hover:opacity-100"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </span>
  );
}
