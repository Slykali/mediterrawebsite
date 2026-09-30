/**
 * Team facts. Everything here without a TODO was checked against FIRST's
 * records on 2026-09-28:
 *   https://frc-events.firstinspires.org/team/6874
 *   https://www.thebluealliance.com/team/6874
 */

// TODO: set NEXT_PUBLIC_SITE_URL in Vercel to the production domain
// (e.g. https://yourdomain.com). Canonicals, hreflang, the sitemap and the
// structured data are all built from it.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://6874.vercel.app").replace(/\/+$/, "");

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
    email: "team6874@example.com", // TODO — the team's real address
    instagram: "https://www.instagram.com/team_6874/",
    x: "https://x.com/team6874",
    xHandle: "@team6874",
    tba: "https://www.thebluealliance.com/team/6874",
    frcEvents: "https://frc-events.firstinspires.org/team/6874",
  },

  url: SITE_URL,
} as const;

/** False while the email above is still the placeholder; keeps it out of structured data. */
export const HAS_REAL_EMAIL = !site.contact.email.endsWith("@example.com");

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
