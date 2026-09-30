import type { MetadataRoute } from "next";

import { PAGES } from "@/lib/pages";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.team.displayName,
    short_name: `FRC ${site.team.number}`,
    description: PAGES.en.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#0c0c0b",
    theme_color: "#0c0c0b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
