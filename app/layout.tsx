import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import {
  Anton,
  Archivo,
  Barlow_Condensed,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Condensed,
  Instrument_Serif,
  Newsreader,
} from "next/font/google";

import { BootProvider } from "@/components/boot/boot-provider";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { JsonLd } from "@/components/shared/json-ld";
import { BOOT_COOKIE } from "@/lib/boot";
import { DESIGN_COOKIE, resolveDesign } from "@/lib/designs";
import { DEFAULT_LOCALE, LOCALE_HEADER, OG_LOCALE, isLocale } from "@/lib/i18n";
import { PAGES } from "@/lib/pages";
import { TITLE_TEMPLATE, sportsTeamJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// Every design's faces are declared here and picked up through CSS variables.
// Only the shared mono and the default design's display face preload; the rest
// download the first time a design actually uses them. Once a design is chosen,
// flip `preload` on for its faces. latin-ext keeps ğ ş ı İ ç ö ü from falling back.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-condensed",
  display: "swap",
  preload: false,
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
  preload: false,
});

const fontVariables = [plexMono, anton, instrument, newsreader, plexCondensed, archivo, barlow]
  .map((font) => font.variable)
  .join(" ");

const home = PAGES.en.home;

/**
 * Site-wide defaults. Every page overrides title, description, canonical,
 * hreflang and the social tags through pageMetadata() in lib/seo.ts; these
 * cover anything that doesn't (the 404).
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.title, template: TITLE_TEMPLATE },
  description: home.description,
  applicationName: site.team.displayName,
  openGraph: {
    type: "website",
    siteName: site.team.displayName,
    locale: OG_LOCALE.en,
    title: home.title,
    description: home.description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.contact.xHandle,
    creator: site.contact.xHandle,
  },
  // TODO: add Google Search Console / Bing Webmaster verification codes here
  // once the domain is live: verification: { google: "…", other: { "msvalidate.01": "…" } }
};

/** Search engines, AI crawlers and link previewers: no intro, no hidden reveals in the HTML. */
const CRAWLER =
  /bot|crawl|spider|slurp|mediapartners|facebookexternalhit|embedly|google-extended|chatgpt-user|perplexity-user|claude-user|bingpreview/i;

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The page picks the design authoritatively (it can also see ?design=). This
  // only gets <html> right on first paint — page background, scrollbars and
  // form controls follow color-scheme, which lives on the design block.
  const cookieStore = await cookies();
  const headerStore = await headers();
  const design = resolveDesign(cookieStore.get(DESIGN_COOKIE)?.value);

  // Set by middleware.ts from the path: /tr/… is Turkish, everything else English.
  const requested = headerStore.get(LOCALE_HEADER);
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  const crawler = CRAWLER.test(headerStore.get("user-agent") ?? "");
  // Seen the intro this session (or a crawler): leave it out of the HTML.
  const skipBoot = crawler || cookieStore.get(BOOT_COOKIE)?.value === "1";

  return (
    // Browser extensions (theme/dark-mode ones especially) add attributes to
    // <html> before React loads. This only silences mismatches on this element.
    <html lang={locale} data-design={design} className={fontVariables} suppressHydrationWarning>
      <body className="antialiased">
        <JsonLd data={sportsTeamJsonLd(locale)} />
        {/* Without JS the boot overlay would sit there forever and every reveal
            would stay at its initial transform. Neither is acceptable. */}
        <noscript>
          <style>{`[data-boot-overlay]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <LocaleProvider locale={locale}>
          <BootProvider skip={skipBoot} crawler={crawler}>
            {children}
          </BootProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
