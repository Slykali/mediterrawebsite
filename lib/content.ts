/**
 * Everything the sections say, in both languages. The design reads from
 * here and nowhere else, so an edit lands everywhere at once. Client
 * components get the right language with useContent(); server code indexes
 * CONTENT[locale].
 *
 * History, results and sponsors come from FIRST's records, checked 2026-09-28:
 *   https://frc-events.firstinspires.org/team/6874  (per-season pages)
 *   https://www.thebluealliance.com/team/6874/history
 * Anything not on those pages is marked TODO.
 */

import type { Locale } from "./i18n";
import { site } from "./site";

export type SectionId = "top" | "timeline" | "garage" | "backers" | "contact";

export const SECTION_IDS: SectionId[] = ["top", "timeline", "garage", "backers", "contact"];

/* --- Helpers -------------------------------------------------------------- */

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export function roman(n: number): string {
  return ROMAN[n - 1] ?? String(n);
}

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

/** Adds a full stop unless the text already ends with one (Turkish ordinals do). */
export function sentence(text: string): string {
  return text.endsWith(".") ? text : `${text}.`;
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

type Localized = Record<Locale, string>;

// FIRST has no registration for 6874 in 2021 or 2022, so those seasons have
// no entry. TODO: if the team did something those years (at-home challenges,
// off-season events, outreach), add it here in both languages.
const TIMELINE_SOURCE: { years: string; kind: TimelineKind; title: Localized; body: Localized }[] = [
  {
    years: "2017",
    kind: "legacy",
    title: { en: "First time on a field", tr: "İlk kez sahada" },
    body: {
      en: "Played the Turkish Robotics Off-Season in Ataşehir in December, before the first official season.",
      tr: "İlk resmi sezondan önce, aralıkta Ataşehir'deki Turkish Robotics Off-Season'da oynadık.",
    },
  },
  {
    years: "2018",
    kind: "legacy",
    title: { en: "Rookie year, as Imperium", tr: "Çaylak yılı, Imperium adıyla" },
    body: {
      en: "Went to the Central Illinois Regional in Peoria. Finished 26th of 37 and won Highest Rookie Seed and the Rookie All Star Award.",
      tr: "Peoria'daki Central Illinois Regional'a gittik. 37 takım arasında 26. olduk; Highest Rookie Seed ve Rookie All Star ödüllerini kazandık.",
    },
  },
  {
    years: "2019",
    kind: "legacy",
    title: { en: "Lycia", tr: "Lycia" },
    body: {
      en: "Registered as Lycia. At the Bosphorus Regional we finished 32nd of 32 with one win in eleven matches. Played the Mersin off-season in October.",
      tr: "Lycia adıyla kayıt olduk. Bosphorus Regional'da on bir maçta tek galibiyetle 32 takım arasında 32. olduk. Ekimde Mersin'deki off-season etkinliğinde oynadık.",
    },
  },
  {
    years: "2020",
    kind: "legacy",
    title: { en: "Imperium again", tr: "Yeniden Imperium" },
    body: {
      en: "47th of 53 at the Bosphorus Regional. FIRST suspended the season the next day.",
      tr: "Bosphorus Regional'da 53 takım arasında 47. olduk. FIRST ertesi gün sezonu askıya aldı.",
    },
  },
  {
    years: "2023",
    kind: "legacy",
    // Titled after the event, not the team: we were registered as Imperium.
    title: { en: "Haliç Regional", tr: "Haliç Regional" },
    body: {
      en: "25th of 50 at the Haliç Regional in Sarıyer, with five wins and three losses in qualifications.",
      tr: "Sarıyer'deki Haliç Regional'da, sıralama maçlarında beş galibiyet ve üç mağlubiyetle 50 takım arasında 25. olduk.",
    },
  },
  {
    years: "2024",
    kind: "legacy",
    title: { en: "Now Mediterra", tr: "Artık Mediterra" },
    body: {
      en: "New name and two regionals in six days. Picked by Alliance 2 at Haliç for our first regional playoffs, then 10th of 53 at Marmara and first pick of Alliance 5.",
      tr: "Yeni isim, altı günde iki regional. Haliç'te 2. İttifak bizi seçti ve ilk kez playoff oynadık; ardından Marmara'da 53 takım arasında 10. olup 5. İttifak'ın ilk seçimi olduk.",
    },
  },
  {
    years: "2025",
    kind: "legacy",
    title: { en: "İstanbul", tr: "İstanbul" },
    body: {
      en: "25th of 48 at the İstanbul Regional in Bakırköy and second pick of Alliance 8, then played the BIST Başakşehir off-season in October.",
      tr: "Bakırköy'deki İstanbul Regional'da 48 takım arasında 25. olduk ve 8. İttifak bizi ikinci seçim olarak aldı. Ekimde BIST Başakşehir off-season etkinliğine katıldık.",
    },
  },
  {
    years: "2026",
    kind: "latest",
    title: { en: "Alliance captain", tr: "İttifak kaptanı" },
    body: {
      en: "Took MT07 to the Başkent Regional in Ankara: 7th of 33, 8 wins and 2 losses in qualifications, and captain of Alliance 5 with 8828 and 6430.",
      tr: "MT07'yi Ankara'daki Başkent Regional'a götürdük: 33 takım arasında 7. olduk, sıralama maçlarında 8 galibiyet 2 mağlubiyet aldık ve 8828 ile 6430'la birlikte 5. İttifak'ın kaptanı olduk.",
    },
  },
  {
    years: "2027",
    kind: "next",
    title: { en: "BIOCORE", tr: "BIOCORE" },
    body: {
      en: "The game is revealed on 9 January.",
      tr: "Oyun 9 Ocak'ta açıklanıyor.",
    },
  },
];

export const TIMELINE_COUNT = TIMELINE_SOURCE.length;

/** Regionals played, 2018–2026 (off-seasons not counted). */
export const REGIONAL_COUNT = 8;

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

type RobotSource = Omit<Robot, "playoffs"> & { playoffs?: Localized };

// TODO: FIRST lists "MT07" as the robot name for both 2025 and 2026; only 2026
// shows it here. Add the other robots' names if they had them.
const ROBOT_SOURCE: RobotSource[] = [
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
    playoffs: { en: "Alliance 5, first pick", tr: "5. İttifak, ilk seçim" },
  },
  {
    season: 2025,
    game: "REEFSCAPE",
    teamName: "Mediterra",
    kind: "elevator",
    event: "İstanbul",
    rank: 25,
    teams: 48,
    playoffs: { en: "Alliance 8, second pick", tr: "8. İttifak, ikinci seçim" },
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
    playoffs: { en: "Alliance 5 captain", tr: "5. İttifak kaptanı" },
  },
  { season: 2027, game: "BIOCORE", teamName: "Mediterra", kind: "swerve", locked: true },
];

export const ROBOT_COUNT = ROBOT_SOURCE.length;
export const UNLOCKED_ROBOTS = ROBOT_SOURCE.filter((robot) => !robot.locked).length;

/** The big label on a robot card: its name if it had one, otherwise the game. */
export function robotTitle(robot: Robot): string {
  return robot.robotName ?? robot.game;
}

/** The 2026 robot, which has its own page. */
export const MT07 = {
  season: 2026,
  name: "MT07",
  game: "REBUILT",
  event: "Başkent Regional",
  city: "Ankara",
  rank: 7,
  teams: 33,
  wins: 8,
  losses: 2,
  alliance: 5,
  partners: [8828, 6430],
} as const;

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

export const CURRENT_SPONSORS = SPONSORS.filter((sponsor) => sponsor.seasons.includes(2026));
export const PAST_SPONSORS = SPONSORS.filter((sponsor) => !sponsor.seasons.includes(2026));

/* --- Contact interests ---------------------------------------------------- */

// No "join the team" option: membership is limited to the school's students and currently closed.
export const INTEREST_VALUES = ["sponsor", "mentor", "other"] as const;

export type Interest = (typeof INTEREST_VALUES)[number];

/* --- Per-language copy ---------------------------------------------------- */

const EN_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const TR_WORDS = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "on bir", "on iki"];

function enOrdinal(n: number): string {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th"}`;
}

function buildContent(locale: Locale) {
  const en = locale === "en";
  const ordinal = en ? enOrdinal : (n: number) => `${n}.`;

  const robots: Robot[] = ROBOT_SOURCE.map((robot) => ({
    ...robot,
    playoffs: robot.playoffs?.[locale],
  }));

  return {
    locale,
    ordinal,
    spell: (n: number) => (en ? EN_WORDS : TR_WORDS)[n] ?? String(n),

    nav: [
      { id: "timeline", label: en ? "Timeline" : "Tarihçe" },
      { id: "garage", label: en ? "Garage" : "Garaj" },
      { id: "backers", label: en ? "Sponsors" : "Sponsorlar" },
      { id: "contact", label: en ? "Contact" : "İletişim" },
    ] as { id: SectionId; label: string }[],

    kickoff: en ? "9 JAN 2027" : "9 OCA 2027",
    kickoffLong: en ? "9 January 2027" : "9 Ocak 2027",
    /** "on 9 January 2027" / "9 Ocak 2027'de" — the date as an adverb. */
    kickoffOn: en ? "on 9 January 2027" : "9 Ocak 2027'de",
    /** "since 2018" / "2018'den beri" */
    sinceRookie: en ? `since ${site.team.rookieYear}` : `${site.team.rookieYear}'den beri`,
    email: en ? "Email" : "E-posta",
    backToTop: en ? "Back to top" : "Başa dön",

    timeline: TIMELINE_SOURCE.map((entry) => ({
      years: entry.years,
      kind: entry.kind,
      title: entry.title[locale],
      body: entry.body[locale],
    })) as TimelineEntry[],

    timelineLabel: (en
      ? { legacy: "Played", latest: "Last season", next: "Next" }
      : { legacy: "Oynandı", latest: "Geçen sezon", next: "Sıradaki" }) as Record<TimelineKind, string>,

    pullQuote: en
      ? "Last of 32 in 2019, alliance captain in 2026."
      : "2019'da 32 takımın sonuncusu, 2026'da ittifak kaptanı.",

    robots,

    /** "7th of 33 at Başkent" / "Başkent Regional'da 33 takım arasında 7." */
    finish(robot: Robot): string {
      if (!robot.rank || !robot.teams) return en ? "Game revealed at kickoff" : "Oyun kickoff'ta açıklanacak";
      return en
        ? `${enOrdinal(robot.rank)} of ${robot.teams} at ${robot.event}`
        : `${robot.event} Regional'da ${robot.teams} takım arasında ${robot.rank}.`;
    },

    /** Alt text for a robot drawing. Says it's an illustration, not the team's robot. */
    glyphAlt(robot: Robot): string {
      if (robot.locked) {
        return en
          ? `Covered silhouette: the ${robot.season} robot for ${robot.game}, hidden until the game is revealed`
          : `Örtülü siluet: ${robot.game} için ${robot.season} robotu, oyun açıklanana kadar gizli`;
      }
      return en
        ? `Line drawing of a typical ${robot.season} robot for ${robot.game}, not the team's own`
        : `${robot.game} için tipik bir ${robot.season} robotunun çizimi; takımın kendi robotu değil`;
    },

    /** Short form for tight cells: "7th of 33" / "33 takımda 7." */
    rankShort(rank: number, teams: number): string {
      return en ? `${enOrdinal(rank)} of ${teams}` : `${teams} takımda ${rank}.`;
    },

    pitch: en
      ? [
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
        ]
      : [
          {
            title: "Nereye gidiyor",
            body: "Regional kayıt ücretleri, parçalar, aküler ve robotla takımı İstanbul ve Ankara'daki yarışmalara götürmek.",
          },
          {
            title: "Karşılığında",
            body: "Logonuz robotta, pitte ve takım tişörtlerinde; ayrıca bu sayfada bir yeriniz olur.",
          },
          {
            title: "Nasıl",
            body: "Para, malzeme, tezgâh zamanı ya da mentorluk. Bize yazın, size uyanı birlikte bulalım.",
          },
        ],

    /** Hero spec grid. Values have to fit Hazard's cells, so keep them short. */
    specs: (en
      ? [
          { label: "Rookie year", value: String(site.team.rookieYear) },
          { label: "Başkent 2026", value: "7th of 33" },
          { label: "2026 robot", value: "MT07" },
          { label: "New members", value: "Closed", accent: true },
        ]
      : [
          { label: "Çaylak yılı", value: String(site.team.rookieYear) },
          { label: "Başkent 2026", value: "33 takımda 7." },
          { label: "2026 robotu", value: "MT07" },
          { label: "Üye alımı", value: "Kapalı", accent: true },
        ]) as { label: string; value: string; accent?: boolean }[],

    interests: INTEREST_VALUES.map((value) => ({
      value,
      label: (en
        ? { sponsor: "Sponsor the team", mentor: "Mentor", other: "Something else" }
        : { sponsor: "Sponsor olmak", mentor: "Mentorluk", other: "Başka bir konu" })[value],
    })),
  };
}

export type Content = ReturnType<typeof buildContent>;

export const CONTENT: Record<Locale, Content> = {
  en: buildContent("en"),
  tr: buildContent("tr"),
};
