/**
 * Everything the sections say. All five designs read from here and nowhere
 * else, so an edit lands everywhere at once.
 *
 * History, results and sponsors come from FIRST's records, checked 2026-09-28:
 *   https://frc-events.firstinspires.org/team/6874  (per-season pages)
 *   https://www.thebluealliance.com/team/6874/history
 * Anything not on those pages is marked TODO.
 */

export const NAV = [
  { id: "timeline", label: "Timeline" },
  { id: "garage", label: "Garage" },
  { id: "backers", label: "Sponsors" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = "top" | (typeof NAV)[number]["id"];

/* --- Helpers -------------------------------------------------------------- */

export function ordinal(n: number): string {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th"}`;
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

export function spell(n: number): string {
  return WORDS[n] ?? String(n);
}

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function roman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

/* --- Timeline ------------------------------------------------------------- */

/** legacy: past seasons · latest: the season just played · next: the one being built for. */
export type TimelineKind = "legacy" | "latest" | "next";

export type TimelineEntry = {
  years: string;
  kind: TimelineKind;
  title: string;
  body: string;
};

// FIRST has no registration for 6874 in 2021 or 2022, so those seasons have
// no entry. TODO: if the team did something those years (at-home challenges,
// off-season events, outreach), add it here.
export const TIMELINE: TimelineEntry[] = [
  {
    years: "2017",
    kind: "legacy",
    title: "First time on a field",
    body: "Played the Turkish Robotics Off-Season in Ataşehir in December, before the first official season.",
  },
  {
    years: "2018",
    kind: "legacy",
    title: "Rookie year, as Imperium",
    body: "Went to the Central Illinois Regional in Peoria. Finished 26th of 37 and won Highest Rookie Seed and the Rookie All Star Award.",
  },
  {
    years: "2019",
    kind: "legacy",
    title: "Lycia",
    body: "Registered as Lycia. At the Bosphorus Regional we finished 32nd of 32 with one win in eleven matches. Played the Mersin off-season in October.",
  },
  {
    years: "2020",
    kind: "legacy",
    title: "Imperium again",
    body: "47th of 53 at the Bosphorus Regional. FIRST suspended the season the next day.",
  },
  {
    years: "2023",
    kind: "legacy",
    title: "Haliç",
    body: "25th of 50 at the Haliç Regional in Sarıyer, with five wins and three losses in qualifications.",
  },
  {
    years: "2024",
    kind: "legacy",
    title: "Now Mediterra",
    body: "New name and two regionals in six days. Picked by Alliance 2 at Haliç for our first playoffs, then 10th of 53 at Marmara and first pick of Alliance 5.",
  },
  {
    years: "2025",
    kind: "legacy",
    title: "İstanbul",
    body: "25th of 48 at the İstanbul Regional in Bakırköy and second pick of Alliance 8. BIST Başakşehir off-season in October.",
  },
  {
    years: "2026",
    kind: "latest",
    title: "Alliance captain",
    body: "Took MT07 to the Başkent Regional in Ankara: 7th of 33, 8 wins and 2 losses in qualifications, and captain of Alliance 5 with 8828 and 6430.",
  },
  {
    years: "2027",
    kind: "next",
    title: "BIOCORE",
    body: "The game is revealed on 9 January. We're recruiting for the build now.",
  },
];

export const TIMELINE_LABEL: Record<TimelineKind, string> = {
  legacy: "Played",
  latest: "Last season",
  next: "Next",
};

/** Regionals played, 2018–2026 (off-seasons not counted). */
export const REGIONAL_COUNT = 8;

export const PULL_QUOTE = "Last of 32 in 2019, alliance captain in 2026.";

/* --- Garage --------------------------------------------------------------- */

export type GlyphKind = "kitbot" | "elevator" | "arm" | "shooter" | "swerve";

export type Robot = {
  season: number;
  /** FIRST's name for that season's game. */
  game: string;
  /** What the team was registered as that season. */
  teamName: string;
  /** Only where the team entered one with FIRST. */
  robotName?: string;
  /**
   * Which line drawing to show. It's the typical robot for that game, not a
   * drawing of ours — say so wherever the drawings are captioned.
   */
  kind: GlyphKind;
  /** Best qualification finish that season. */
  event?: string;
  rank?: number;
  teams?: number;
  playoffs?: string;
  locked?: boolean;
};

// TODO: FIRST lists "MT07" as the robot name for both 2025 and 2026; only 2026
// shows it here. Add the other robots' names if they had them.
export const ROBOTS: Robot[] = [
  { season: 2018, game: "POWER UP", teamName: "Imperium", kind: "elevator", event: "Central Illinois", rank: 26, teams: 37 },
  { season: 2019, game: "DEEP SPACE", teamName: "Lycia", kind: "arm", event: "Bosphorus", rank: 32, teams: 32 },
  { season: 2020, game: "INFINITE RECHARGE", teamName: "Imperium", kind: "shooter", event: "Bosphorus", rank: 47, teams: 53 },
  { season: 2023, game: "CHARGED UP", teamName: "Imperium", kind: "arm", event: "Haliç", rank: 25, teams: 50 },
  {
    season: 2024,
    game: "CRESCENDO",
    teamName: "Mediterra",
    kind: "shooter",
    event: "Marmara",
    rank: 10,
    teams: 53,
    playoffs: "Alliance 5, first pick",
  },
  {
    season: 2025,
    game: "REEFSCAPE",
    teamName: "Mediterra",
    kind: "elevator",
    event: "İstanbul",
    rank: 25,
    teams: 48,
    playoffs: "Alliance 8, second pick",
  },
  {
    season: 2026,
    game: "REBUILT",
    teamName: "Mediterra",
    robotName: "MT07",
    kind: "shooter",
    event: "Başkent",
    rank: 7,
    teams: 33,
    playoffs: "Alliance 5 captain",
  },
  { season: 2027, game: "BIOCORE", teamName: "Mediterra", kind: "swerve", locked: true },
];

export const UNLOCKED_ROBOTS = ROBOTS.filter((robot) => !robot.locked).length;

/** "7th of 33 at Başkent" */
export function finish(robot: Robot): string {
  if (!robot.rank || !robot.teams) return "Game revealed at kickoff";
  return `${ordinal(robot.rank)} of ${robot.teams} at ${robot.event}`;
}

/** The big label on a robot card: its name if it had one, otherwise the game. */
export function robotTitle(robot: Robot): string {
  return robot.robotName ?? robot.game;
}

/* --- Sponsors ------------------------------------------------------------- */

export type Sponsor = { name: string; seasons: number[] };

// From the sponsor list in each season's FIRST registration. The 2026 entry
// also lists "Bk". TODO: find out what that is and add it.
export const SPONSORS: Sponsor[] = [
  { name: "MGA Airlines", seasons: [2025, 2026] },
  { name: "Levent Kimya", seasons: [2020, 2023, 2024, 2025] },
  { name: "Antera", seasons: [2025] },
  { name: "Crystal Industrial", seasons: [2024] },
  { name: "Bosch", seasons: [2020] },
  { name: "SMC", seasons: [2020] },
  { name: "Bahçeşehir Üniversitesi", seasons: [2020] },
  { name: "Antalya Büyükşehir Belediyesi", seasons: [2020] },
];

/** [2020, 2023, 2024, 2025] → "2020, 2023–25" */
export function formatSeasons(seasons: number[]): string {
  const sorted = [...seasons].sort((a, b) => a - b);
  const runs: [number, number][] = [];
  for (const year of sorted) {
    const last = runs.at(-1);
    if (last && year === last[1] + 1) last[1] = year;
    else runs.push([year, year]);
  }
  return runs.map(([a, b]) => (a === b ? String(a) : `${a}–${String(b).slice(2)}`)).join(", ");
}

export const CURRENT_SPONSORS = SPONSORS.filter((sponsor) => sponsor.seasons.includes(2026));
export const PAST_SPONSORS = SPONSORS.filter((sponsor) => !sponsor.seasons.includes(2026));

export const PITCH = [
  {
    title: "Where it goes",
    body: "Regional registration, parts, batteries, and getting the robot and team to events in İstanbul and Ankara.",
  },
  {
    title: "What you get",
    body: "Your logo on the robot, in the pit and on team shirts, and a place on this page.",
  },
  {
    title: "How",
    body: "Money, materials, machining time or mentoring. Email us and we'll work out what fits.",
  },
] as const;
