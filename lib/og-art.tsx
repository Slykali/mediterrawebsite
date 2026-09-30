import { ImageResponse } from "next/og";

import type { Locale } from "./i18n";
import { site } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

const TEXT = {
  en: {
    alt: `FRC ${site.team.number} Mediterra, a FIRST Robotics Competition team from Döşemealtı, Antalya, Türkiye`,
    season: `${site.team.season} season`,
    tagline: "We are back.",
    footer: `Döşemealtı, Antalya, Türkiye · since ${site.team.rookieYear} · 2026: 7th of 33, alliance captain`,
  },
  tr: {
    alt: `FRC ${site.team.number} Mediterra, Döşemealtı, Antalya'dan bir FIRST Robotics Competition takımı`,
    season: `${site.team.season} sezonu`,
    tagline: "Geri döndük.",
    footer: `Döşemealtı, Antalya · ${site.team.rookieYear}'den beri · 2026: 33 takımda 7., ittifak kaptanı`,
  },
} as const;

export const ogAlt = (locale: Locale) => TEXT[locale].alt;

/** Link preview card in Kinetic's colours. Satori needs display:flex on anything with more than one child. */
export function ogImage(locale: Locale) {
  const t = TEXT[locale];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 64,
          background: "#0c0c0b",
          color: "#edeae3",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4, color: "#77746b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#edeae3" }}>
            <div style={{ width: 16, height: 16, background: "#ff3d00" }} />
            FIRST ROBOTICS COMPETITION
          </div>
          <div style={{ display: "flex" }}>{t.season.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#ff3d00", letterSpacing: 2 }}>
            FRC {site.team.number}
          </div>
          <div style={{ display: "flex", fontSize: 168, fontWeight: 900, lineHeight: 0.9, letterSpacing: -6 }}>
            MEDITERRA
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 40, color: "#edeae3" }}>{t.tagline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#77746b" }}>{t.footer}</div>
      </div>
    ),
    OG_SIZE,
  );
}
