"use client";

import { createContext, useContext, type ReactNode } from "react";

import { CONTENT, type Content } from "@/lib/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/**
 * Set once in the root layout from the x-locale header. Links that change
 * language are plain <a> tags (a full load), because the root layout — and
 * with it <html lang> and this provider — doesn't re-render on client-side
 * navigation.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** The shared section content in the page's language. */
export function useContent(): Content {
  return CONTENT[useLocale()];
}
