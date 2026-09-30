/**
 * Two languages. English lives at the root ("/history"), Turkish under /tr
 * ("/tr/history"). Paths are the same in both so hreflang pairs are trivial.
 */
export const LOCALES = ["en", "tr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Set by middleware.ts so the root layout can put the right lang on <html>. */
export const LOCALE_HEADER = "x-locale";

export const OG_LOCALE: Record<Locale, string> = { en: "en_US", tr: "tr_TR" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** localePath("tr", "/history") → "/tr/history"; localePath("tr", "/") → "/tr". */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** "/tr/history" → { locale: "tr", path: "/history" }. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/tr" || pathname.startsWith("/tr/")) {
    return { locale: "tr", path: pathname.slice(3) || "/" };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}
