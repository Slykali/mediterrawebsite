import { ImageResponse } from "next/og";

import type { Locale } from "./i18n";
import { site } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

const { team } = site;

const TEXT = {
  en: {
    alt: `FRC ${team.number} Mediterra, a FIRST Robotics Competition team from Döşemealtı, Antalya, Türkiye`,
    program: "FIRST® Robotics Competition team",
    next: "Next match",
    season: `${team.season} season`,
    footer: `Döşemealtı, Antalya · since ${team.rookieYear} · 2026: 7th of 33, Alliance 5 captain`,
  },
  tr: {
    alt: `FRC ${team.number} Mediterra, Antalya Döşemealtı'ndan bir FIRST Robotics Competition takımı`,
    program: "FIRST® Robotics Competition takımı",
    next: "Sıradaki maç",
    season: `${team.season} sezonu`,
    footer: `Döşemealtı, Antalya · ${team.rookieYear}'den beri · 2026: 33 takımda 7., 5. İttifak kaptanı`,
  },
} as const;

export const ogAlt = (locale: Locale) => TEXT[locale].alt;

const RED = "#e3262c";
const BLUE = "#1f6fe0";
const INK = "#f3f5f9";
const MUTE = "#7d879b";

/**
 * Barlow Condensed, the site's face, subset to just the characters on the card:
 * 800 italic for the headline, 500 for the small print. If Google Fonts can't
 * be reached at build time the card still renders, in the default sans.
 */
async function barlow(axis: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@${axis}&text=${encodeURIComponent(text)}`,
    );
    if (!cssRes.ok) return null;
    const url = (await cssRes.text()).match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    const fontRes = await fetch(url);
    return fontRes.ok ? await fontRes.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Link preview card in Matchday's broadcast style. Satori needs display:flex on anything with more than one child. */
export async function ogImage(locale: Locale) {
  const t = TEXT[locale];
  const next = t.next.toLocaleUpperCase(locale);
  const [display, body] = await Promise.all([
    barlow("1,800", `${team.number}MEDITERRA${next}${team.season}`),
    barlow("0,500", `${t.program}${t.season}${t.footer}`),
  ]);
  // Two separate families so neither face fills in glyphs for the other's text.
  const HUD = display ? { fontFamily: "Barlow Display", fontStyle: "italic" as const, fontWeight: 800 } : { fontWeight: 900 };
  const fonts = [
    ...(display ? [{ name: "Barlow Display", data: display, style: "italic" as const, weight: 800 as const }] : []),
    ...(body ? [{ name: "Barlow Body", data: body, style: "normal" as const, weight: 500 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#06080d",
          color: INK,
          ...(body ? { fontFamily: "Barlow Body" } : {}),
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", padding: "56px 64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 3, color: MUTE }}>
            <div style={{ display: "flex" }}>{t.program}</div>
            <div style={{ display: "flex" }}>{t.season}</div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}>
            <div style={{ display: "flex", background: RED, padding: "6px 22px", fontSize: 120, lineHeight: 1, ...HUD }}>
              {team.number}
            </div>
            <div style={{ display: "flex", fontSize: 150, lineHeight: 0.85, ...HUD }}>MEDITERRA</div>
          </div>

          <div style={{ display: "flex", alignItems: "stretch", fontSize: 40 }}>
            <div style={{ display: "flex", alignItems: "center", border: `2px solid #1c2434`, padding: "8px 22px", color: MUTE, ...HUD }}>
              {next}
            </div>
            <div style={{ display: "flex", alignItems: "center", background: BLUE, padding: "8px 22px", ...HUD }}>
              {team.season}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 26, color: MUTE }}>{t.footer}</div>
        </div>
        <div style={{ display: "flex", height: 14 }}>
          <div style={{ display: "flex", flex: 1, background: RED }} />
          <div style={{ display: "flex", flex: 1, background: BLUE }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
