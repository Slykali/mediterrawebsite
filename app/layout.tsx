import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
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
import { DESIGN_COOKIE, resolveDesign } from "@/lib/designs";
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

const description = `FRC Team ${site.team.number} Mediterra, the robotics team of ${site.team.school} in ${site.team.city}. Competing since ${site.team.rookieYear}, building for ${site.team.game} in ${site.team.season}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `FRC ${site.team.number} · ${site.team.name}`,
    template: `%s · FRC ${site.team.number}`,
  },
  description,
  openGraph: {
    title: `FRC ${site.team.number} · ${site.team.name}`,
    description,
    url: site.url,
    siteName: `FRC ${site.team.number}`,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The page picks the design authoritatively (it can also see ?design=). This
  // only gets <html> right on first paint — page background, scrollbars and
  // form controls follow color-scheme, which lives on the design block.
  const design = resolveDesign((await cookies()).get(DESIGN_COOKIE)?.value);

  return (
    <html lang="en" data-design={design} className={fontVariables}>
      <body className="antialiased">
        {/* Without JS the boot overlay would sit there forever and every reveal
            would stay at its initial transform. Neither is acceptable. */}
        <noscript>
          <style>{`[data-boot-overlay]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <BootProvider>{children}</BootProvider>
      </body>
    </html>
  );
}
