/**
 * Team facts. Everything here without a TODO was checked against FIRST's
 * records on 2026-09-28:
 *   https://frc-events.firstinspires.org/team/6874
 *   https://www.thebluealliance.com/team/6874
 */
export const site = {
  team: {
    number: 6874,
    name: "MEDITERRA",
    formerNames: ["Imperium", "Lycia"],
    school: "Özel Antalya Bahçeşehir Anadolu Lisesi",
    city: "Döşemealtı, Antalya",
    program: "FIRST Robotics Competition",
    rookieYear: 2018,
    lastCompeted: 2026,
    season: 2027,
    game: "BIOCORE",
    kickoff: "9 JAN 2027",
    kickoffLong: "9 January 2027",
    // 12:00 ET, per firstinspires.org/programs/frc/game-and-season.
    kickoffISO: "2027-01-09T17:00:00Z",
  },

  contact: {
    email: "team6874@example.com", // TODO — the team's real address
    instagram: "https://www.instagram.com/team_6874/",
    x: "https://x.com/team6874",
    tba: "https://www.thebluealliance.com/team/6874",
    frcEvents: "https://frc-events.firstinspires.org/team/6874",
  },

  url: "https://6874.vercel.app", // TODO — production domain
} as const;

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

/** Hero spec grid. Values have to fit Hazard's cells, so keep them short. */
export const SPECS = [
  { label: "Rookie year", value: String(site.team.rookieYear) },
  { label: "Başkent 2026", value: "7th of 33" },
  { label: "2026 robot", value: "MT07" },
  { label: "Crew", value: "Recruiting", accent: true },
] as const;
