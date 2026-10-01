/**
 * Team facts. Everything here without a TODO was checked against FIRST's
 * records on 2026-09-28:
 *   https://frc-events.firstinspires.org/team/6874
 *   https://www.thebluealliance.com/team/6874
 */

// Canonicals, hreflang, the sitemap and the structured data are all built from
// this. On Vercel it's the project's production domain automatically; set
// NEXT_PUBLIC_SITE_URL to override it (e.g. once a custom domain is added).
const PRODUCTION_HOST = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (PRODUCTION_HOST ? `https://${PRODUCTION_HOST}` : "http://localhost:3000")
).replace(/\/+$/, "");

// The address replies come from. It should be a mailbox the school or an adult
// mentor controls. Until NEXT_PUBLIC_CONTACT_EMAIL is set, the site shows no
// email at all and points people to Instagram instead.
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

export const site = {
  team: {
    number: 6874,
    name: "MEDITERRA",
    /** Display form for titles, schema and prose. */
    displayName: "FRC 6874 Mediterra",
    // 2023 was registered as Imperium (at the Haliç Regional), per FIRST.
    // TODO: confirm with the team whether "Haliç" was ever a team name.
    formerNames: ["Imperium", "Lycia"],
    school: "Özel Antalya Bahçeşehir Anadolu Lisesi",
    city: "Döşemealtı, Antalya",
    locality: "Döşemealtı",
    region: "Antalya",
    country: "Türkiye",
    countryCode: "TR",
    program: "FIRST Robotics Competition",
    rookieYear: 2018,
    lastCompeted: 2026,
    season: 2027,
    game: "BIOCORE",
    // 12:00 ET, per firstinspires.org/programs/frc/game-and-season.
    kickoffISO: "2027-01-09T17:00:00Z",
  },

  contact: {
    email: CONTACT_EMAIL,
    instagram: "https://www.instagram.com/team_6874/",
    x: "https://x.com/team6874",
    xHandle: "@team6874",
    tba: "https://www.thebluealliance.com/team/6874",
    frcEvents: "https://frc-events.firstinspires.org/team/6874",
  },

  url: SITE_URL,
} as const;

/** False until NEXT_PUBLIC_CONTACT_EMAIL is set. */
export const HAS_REAL_EMAIL = site.contact.email !== null;

/** Outbound links every footer shows. */
export const LINKS = [
  { label: "Instagram", href: site.contact.instagram },
  { label: "X", href: site.contact.x },
  { label: "The Blue Alliance", href: site.contact.tba },
] as const;

/**
 * Flip to true once /public/media/hero-loop.{webm,mp4} and hero-poster.jpg
 * actually exist. While it's false the <video> is never rendered at all.
 */
export const HAS_HERO_MEDIA = false;
