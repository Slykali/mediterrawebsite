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
    background_color: "#06080d",
    theme_color: "#06080d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
