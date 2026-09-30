import type { MetadataRoute } from "next";

import { LOCALES, localePath } from "@/lib/i18n";
import { PAGE_PATHS, type PageKey } from "@/lib/pages";
import { languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";

const PRIORITY: Record<PageKey, number> = {
  home: 1,
  history: 0.8,
  join: 0.8,
  sponsors: 0.7,
  robot2026: 0.6,
};

/** Every page in both languages, each listing its other-language twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

  return (Object.keys(PAGE_PATHS) as PageKey[]).flatMap((page) => {
    const path = PAGE_PATHS[page];
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [lang, abs(href)]),
    );
    return LOCALES.map((locale) => ({
      url: abs(localePath(locale, path)),
      lastModified,
      changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: PRIORITY[page],
      alternates: { languages },
    }));
  });
}
