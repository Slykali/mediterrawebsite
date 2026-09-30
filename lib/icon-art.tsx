import { ImageResponse } from "next/og";

/**
 * The favicon mark (app/icon.svg) drawn at any size: a hazard-orange square
 * over two bone rules on carbon. TODO: swap for the team's real logo if there
 * is one — replace app/icon.svg and this drawing together.
 */
export function iconImage(size: number) {
  const u = size / 32;
  const block = (x: number, y: number, w: number, h: number, background: string) => (
    <div style={{ position: "absolute", left: x * u, top: y * u, width: w * u, height: h * u, background }} />
  );

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#0c0c0b" }}>
        {block(6, 6, 8, 8, "#ff3d00")}
        {block(6, 18, 20, 3, "#edeae3")}
        {block(6, 23, 13, 3, "#edeae3")}
      </div>
    ),
    { width: size, height: size },
  );
}
