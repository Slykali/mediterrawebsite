import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import { Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";

import { A11yMenu } from "@/components/a11y/a11y-menu";
import { A11yProvider } from "@/components/a11y/a11y-provider";
import { BootProvider } from "@/components/boot/boot-provider";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { JsonLd } from "@/components/shared/json-ld";
import { A11Y_HEAD_SCRIPT } from "@/lib/a11y";
import { BOOT_COOKIE } from "@/lib/boot";
import { DEFAULT_DESIGN } from "@/lib/designs";
import { DEFAULT_LOCALE, LOCALE_HEADER, OG_LOCALE, isLocale } from "@/lib/i18n";
import { CHROME, PAGES } from "@/lib/pages";
import { TITLE_TEMPLATE, sportsTeamJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// Matchday's two faces, only the weights it uses: Plex Mono for labels, Barlow
// for everything else (500 is the body weight, 800 italic the headlines).
// latin-ext keeps ğ ş ı İ ç ö ü from falling back.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const fontVariables = `${plexMono.variable} ${barlow.variable}`;

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
  themeColor: "#06080d",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // Set by middleware.ts from the path: /tr/… is Turkish, everything else English.
  const requested = headerStore.get(LOCALE_HEADER);
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  const crawler = CRAWLER.test(headerStore.get("user-agent") ?? "");
  // Seen the intro this session (or a crawler): leave it out of the HTML.
  const skipBoot = crawler || cookieStore.get(BOOT_COOKIE)?.value === "1";

  return (
    // Browser extensions (theme/dark-mode ones especially) add attributes to
    // <html> before React loads. This only silences mismatches on this element.
    <html lang={locale} data-design={DEFAULT_DESIGN} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Saved accessibility settings, applied before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: A11Y_HEAD_SCRIPT }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {CHROME[locale].skip}
        </a>
        <JsonLd data={sportsTeamJsonLd(locale)} />
        {/* Without JS the boot overlay would sit there forever and every reveal
            would stay at its initial transform. Neither is acceptable. */}
        <noscript>
          <style>{`[data-boot-overlay]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <LocaleProvider locale={locale}>
          <A11yProvider>
            <BootProvider skip={skipBoot} crawler={crawler}>
              {children}
            </BootProvider>
            <A11yMenu />
          </A11yProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
