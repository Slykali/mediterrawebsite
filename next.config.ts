import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Preview deployments get the Vercel Toolbar, served from vercel.live.
const toolbar = process.env.VERCEL_ENV === "preview" ? " https://vercel.live" : "";

/**
 * Everything the site loads comes from its own origin: fonts are self-hosted by
 * next/font and Vercel Analytics is served from /_vercel. Inline scripts and
 * styles stay allowed because Next's hydration data, the JSON-LD blocks and
 * Framer Motion's style attributes need them. Dev adds eval for Fast Refresh
 * and the analytics debug script.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${toolbar}${isDev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""}`,
  `style-src 'self' 'unsafe-inline'${toolbar}`,
  `img-src 'self' data: blob:${toolbar}`,
  "media-src 'self'",
  `font-src 'self'${toolbar}`,
  `connect-src 'self'${toolbar}${isDev ? " ws: https://va.vercel-scripts.com" : ""}`,
  `frame-src 'self'${toolbar}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The dev badge sits bottom-left, right on top of the accessibility button.
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
