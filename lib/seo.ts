import type { Metadata } from "next";

import { CURRENT_SPONSORS } from "./content";
import { FAQ } from "./faq";
import { LOCALES, OG_LOCALE, localePath, type Locale } from "./i18n";
import { OG_SIZE, ogAlt } from "./og-art";
import { PAGES, PAGE_PATHS, type PageKey } from "./pages";
import { HAS_REAL_EMAIL, site } from "./site";

export const TITLE_TEMPLATE = `%s | ${site.team.displayName}`;

/** hreflang map for a locale-neutral path, plus x-default → English. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = localePath(locale, path);
  languages["x-default"] = localePath("en", path);
  return languages;
}

/**
 * Everything a page needs in <head>: title, description, canonical, hreflang,
 * Open Graph and Twitter. The canonical is always the clean path, without
 * any query string.
 */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const copy = PAGES[locale][page];
  const path = PAGE_PATHS[page];
  const url = localePath(locale, path);
  const title = page === "home" ? { absolute: copy.title } : copy.title;
  const fullTitle = page === "home" ? copy.title : TITLE_TEMPLATE.replace("%s", copy.title);
  // Setting openGraph here replaces the file-based card from app/opengraph-image,
  // so every page names it explicitly.
  const image = {
    url: locale === "tr" ? "/tr/opengraph-image" : "/opengraph-image",
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    alt: ogAlt(locale),
  };

  return {
    title,
    description: copy.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: site.team.displayName,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url,
      title: fullTitle,
      description: copy.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: site.contact.xHandle,
      creator: site.contact.xHandle,
      title: fullTitle,
      description: copy.description,
      images: [image],
    },
  };
}

/* --- Structured data ------------------------------------------------------ */

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export function sportsTeamJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "@id": `${site.url}/#team`,
    name: site.team.displayName,
    // Haliç left out on purpose: FIRST's records have 2023 as Imperium.
    alternateName: ["Team 6874", "FRC Team 6874", ...site.team.formerNames],
    sport: "Robotics",
    url: abs(localePath(locale, "/")),
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/opengraph-image`,
    foundingDate: String(site.team.rookieYear),
    description: PAGES[locale].home.description,
    location: {
      "@type": "Place",
      name: `${site.team.city}, ${site.team.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.team.locality,
        addressRegion: site.team.region,
        addressCountry: site.team.countryCode,
      },
    },
    memberOf: {
      "@type": "SportsOrganization",
      name: "FIRST Robotics Competition",
      url: "https://www.firstinspires.org/robotics/frc",
    },
    sponsor: [
      { "@type": "EducationalOrganization", name: site.team.school },
      ...CURRENT_SPONSORS.map((sponsor) => ({ "@type": "Organization", name: sponsor.name })),
    ],
    ...(HAS_REAL_EMAIL ? { email: site.contact.email } : {}),
    sameAs: [site.contact.tba, site.contact.frcEvents, site.contact.instagram, site.contact.x],
  };
}

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: FAQ[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(locale: Locale, page: PageKey) {
  const pages = PAGES[locale];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pages.home.label, item: abs(localePath(locale, "/")) },
      {
        "@type": "ListItem",
        position: 2,
        name: pages[page].label,
        item: abs(localePath(locale, PAGE_PATHS[page])),
      },
    ],
  };
}
