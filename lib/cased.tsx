import { Fragment, type ReactNode } from "react";

import type { Locale } from "./i18n";

/*
 * CSS uppercase follows the page language. On /tr "Mediterra" becomes
 * "MEDİTERRA" and "Airlines" "AİRLİNES"; on the English pages "Haliç" becomes
 * "HALIÇ" and "Kimya" "KIMYA". Wrapping those words in a span with their own
 * lang gives each one the right capitals. Only words with an i in them can go
 * wrong, so only those need listing.
 */

/** English words and names that turn up in Turkish copy. */
const ENGLISH = /(?<!\p{L})(?:Mediterra|Imperium|Lycia|Kickoff|Regional|Airlines|Industrial|Infinite|Rebuilt|Highest|Rookie|Crystal|Bosphorus|Driver|Off-season|Alliance|Instagram)(?!\p{L})/giu;

/** Turkish words in English copy: anything with Turkish letters, plus a few without. */
const TURKISH = /(?<!\p{L})(?:\p{L}*[çğıöşüÇĞİÖŞÜ]\p{L}*|Kimya|Belediyesi|Lisesi|Mersin)(?!\p{L})/gu;

const OTHER: Record<Locale, { lang: Locale; pattern: RegExp }> = {
  tr: { lang: "en", pattern: ENGLISH },
  en: { lang: "tr", pattern: TURKISH },
};

/** `text` with the other language's words marked, for anything set in capitals. */
export function cased(text: string, locale: Locale): ReactNode {
  const { lang, pattern } = OTHER[locale];
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <span key={start} lang={lang}>
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
