import { ImageResponse } from "next/og";

import { LOGO_DATA_URI, LOGO_RATIO } from "./logo";

/**
 * The team logo on a white tile, at any size, for the PNG icons (Apple touch
 * icon, the web manifest, the structured-data logo). The logo takes 80% of the
 * width so it stays inside the safe area when a platform rounds the corners.
 */
export function iconImage(size: number) {
  const w = Math.round(size * 0.8);

  return new ImageResponse(
    (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#ffffff" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain img */}
        <img src={LOGO_DATA_URI} width={w} height={Math.round(w / LOGO_RATIO)} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
