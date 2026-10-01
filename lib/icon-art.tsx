import { ImageResponse } from "next/og";

/**
 * The favicon mark (app/icon.svg) drawn at any size: a red and a blue block,
 * the two alliances, on Matchday's near-black. TODO: swap for the team's real
 * logo if there is one; replace app/icon.svg and this drawing together.
 */
export function iconImage(size: number) {
  const u = size / 32;
  const block = (x: number, y: number, w: number, h: number, background: string) => (
    <div style={{ position: "absolute", left: x * u, top: y * u, width: w * u, height: h * u, background }} />
  );

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#06080d" }}>
        {block(5, 7, 10, 18, "#e3262c")}
        {block(17, 7, 10, 18, "#1f6fe0")}
      </div>
    ),
    { width: size, height: size },
  );
}
