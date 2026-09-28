import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `FRC ${site.team.number} ${site.team.name}. We are back.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview card. Satori needs display:flex on anything with more than one child. */
export default function OpengraphImage() {
  const { team } = site;

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
            {`FRC ${team.number} — ${team.name}`}
          </div>
          <div style={{ display: "flex" }}>{`${team.season} SEASON`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 176, fontWeight: 900, lineHeight: 0.88, letterSpacing: -6 }}>
          <div style={{ display: "flex" }}>WE ARE</div>
          <div style={{ display: "flex" }}>BACK</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#77746b" }}>
          {`${team.city} · since ${team.rookieYear} · 2026: 7th of 33, alliance captain`}
        </div>
      </div>
    ),
    size,
  );
}
