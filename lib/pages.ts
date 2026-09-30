/**
 * Page-level copy: titles, descriptions, headings and the bits of chrome that
 * sit outside the five designs (page header, FAQ, 404). Both languages.
 */

import { MT07 } from "./content";
import type { Locale } from "./i18n";
import { site } from "./site";

export type PageKey = "home" | "history" | "sponsors" | "join" | "robot2026";

/** Locale-neutral paths. localePath() adds /tr. */
export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  history: "/history",
  sponsors: "/sponsors",
  join: "/join",
  robot2026: "/robot/2026",
};

export type PageCopy = {
  /** <title>. Home's is absolute; the rest go through the "%s | FRC 6874 Mediterra" template. */
  title: string;
  description: string;
  /** The page's one <h1> (subpages only; each design supplies its own on home). */
  h1: string;
  kicker: string;
  intro: string;
  /** Short label for nav and breadcrumbs. */
  label: string;
};

const EN: Record<PageKey, PageCopy> = {
  home: {
    title: "FRC 6874 Mediterra | FIRST Robotics Team, Antalya",
    description:
      "FRC Team 6874 Mediterra is a FIRST Robotics Competition team from Döşemealtı, Antalya, Türkiye. 2026 Başkent Regional: 7th of 33, Alliance 5 captain. Building for the 2027 season.",
    h1: "FRC 6874 Mediterra",
    kicker: "",
    intro: "",
    label: "Home",
  },
  history: {
    title: "Team History and Results, 2017–2026",
    description:
      "Every season of FRC Team 6874 Mediterra since 2017: events, rankings and playoff results from FIRST's records, including 7th of 33 and Alliance 5 captain at the 2026 Başkent Regional.",
    h1: "History and results",
    kicker: "Match log · 2017–2027",
    intro:
      "The team has competed in FIRST Robotics Competition since its 2018 rookie season, registered as Imperium (2018, 2020, 2023), Lycia (2019) and, since 2024, Mediterra. These are every event and result on FIRST's own records.",
    label: "History",
  },
  sponsors: {
    title: "Sponsors and Sponsorship",
    description:
      "The companies behind FRC Team 6874 Mediterra, a FIRST robotics team in Antalya, Türkiye, and how to sponsor the team: where the money goes, what sponsors get and how to get in touch.",
    h1: "Sponsors",
    kicker: "Partners · since 2018",
    intro: `${site.team.school} has backed the team every season. MGA Airlines, Levent Kimya, Antera, Crystal Industrial, Bosch, SMC, Bahçeşehir Üniversitesi and Antalya Büyükşehir Belediyesi have backed it too, in the seasons listed below.`,
    label: "Sponsors",
  },
  join: {
    title: "Joining the Team and Contact",
    description:
      "FRC Team 6874 Mediterra is a school team: only students of Özel Antalya Bahçeşehir Anadolu Lisesi can join, and membership is currently closed. Sponsors and mentors can get in touch here.",
    h1: "Join the team",
    kicker: "School team · membership closed",
    intro:
      "FRC 6874 Mediterra is a school team made up of students of Özel Antalya Bahçeşehir Anadolu Lisesi, and we aren't taking new members right now. Companies that want to sponsor and engineers who could mentor can still write to us below, and someone on the team will answer.",
    label: "Join",
  },
  robot2026: {
    title: "MT07, the 2026 Robot",
    description: `MT07 is FRC Team 6874 Mediterra's robot for the 2026 season (${MT07.game}). At the Başkent Regional in Ankara it finished 7th of 33, went 8–2 in qualifications and captained Alliance 5.`,
    h1: "MT07",
    kicker: "2026 robot · REBUILT",
    intro:
      "MT07 is the robot the team built for the 2026 FIRST Robotics Competition season. It took the team to its best finish so far: 7th of 33 at the Başkent Regional in Ankara and captain of Alliance 5.",
    label: "MT07",
  },
};

const TR: Record<PageKey, PageCopy> = {
  home: {
    title: "FRC 6874 Mediterra | Antalya Robotik Takımı",
    description:
      "FRC 6874 Mediterra, Döşemealtı, Antalya'dan bir FIRST Robotics Competition takımı. 2026 Başkent Regional: 33 takım arasında 7. ve 5. İttifak kaptanı. 2027 sezonuna hazırlanıyor.",
    h1: "FRC 6874 Mediterra",
    kicker: "",
    intro: "",
    label: "Ana sayfa",
  },
  history: {
    title: "Takım Tarihçesi ve Sonuçlar, 2017–2026",
    description:
      "FRC 6874 Mediterra'nın 2017'den bu yana her sezonu: FIRST kayıtlarından yarışmalar, sıralamalar ve playoff sonuçları. 2026 Başkent Regional'da 33 takım arasında 7. ve 5. İttifak kaptanı.",
    h1: "Tarihçe ve sonuçlar",
    kicker: "Maç kaydı · 2017–2027",
    intro:
      "Takım, 2018'deki çaylak sezonundan bu yana FIRST Robotics Competition'da yarışıyor: Imperium (2018, 2020, 2023), Lycia (2019) ve 2024'ten beri Mediterra adıyla. Aşağıda FIRST'ün kendi kayıtlarındaki tüm yarışmalar ve sonuçlar var.",
    label: "Tarihçe",
  },
  sponsors: {
    title: "Sponsorlar ve Sponsorluk",
    description:
      "Antalya'daki FIRST robotik takımı FRC 6874 Mediterra'nın arkasındaki şirketler ve takıma nasıl sponsor olunur: destek nereye gider, sponsorlar ne kazanır, nasıl iletişime geçilir.",
    h1: "Sponsorlar",
    kicker: "Destekçiler · 2018'den beri",
    intro: `${site.team.school} takımı her sezon destekledi. MGA Airlines, Levent Kimya, Antera, Crystal Industrial, Bosch, SMC, Bahçeşehir Üniversitesi ve Antalya Büyükşehir Belediyesi de aşağıda yazan sezonlarda destek verdi.`,
    label: "Sponsorlar",
  },
  join: {
    title: "Takıma Katılım ve İletişim",
    description:
      "FRC 6874 Mediterra bir okul takımı: yalnızca Özel Antalya Bahçeşehir Anadolu Lisesi öğrencileri katılabilir ve üye alımı şu anda kapalı. Sponsorlar ve mentorlar buradan bize ulaşabilir.",
    h1: "Takıma katıl",
    kicker: "Okul takımı · üye alımı kapalı",
    intro:
      "FRC 6874 Mediterra, Özel Antalya Bahçeşehir Anadolu Lisesi öğrencilerinden oluşan bir okul takımı ve şu anda yeni üye almıyoruz. Sponsor olmak isteyen şirketler ve mentorluk yapabilecek mühendisler aşağıdan bize yazabilir; takımdan biri size dönecek.",
    label: "Katıl",
  },
  robot2026: {
    title: "MT07, 2026 Robotumuz",
    description: `MT07, FRC 6874 Mediterra'nın 2026 sezonu (${MT07.game}) robotu. Ankara'daki Başkent Regional'da 33 takım arasında 7. oldu, sıralama maçlarında 8–2 yaptı ve 5. İttifak'ın kaptanı oldu.`,
    h1: "MT07",
    kicker: "2026 robotu · REBUILT",
    intro:
      "MT07, takımın 2026 FIRST Robotics Competition sezonu için yaptığı robot. Takımı bugüne kadarki en iyi derecesine taşıdı: Ankara'daki Başkent Regional'da 33 takım arasında 7.lik ve 5. İttifak kaptanlığı.",
    label: "MT07",
  },
};

export const PAGES: Record<Locale, Record<PageKey, PageCopy>> = { en: EN, tr: TR };

/** Order of the page header nav. */
export const NAV_PAGES: PageKey[] = ["history", "sponsors", "robot2026", "join"];

/* --- Chrome --------------------------------------------------------------- */

export const CHROME = {
  en: {
    languageName: "English",
    switchTo: "Türkçe",
    switchLabel: "Bu sayfayı Türkçe oku",
    breadcrumb: "Breadcrumb",
    pagesNav: "Pages",
    through: {
      history: "Full history and results",
      robot2026: "MT07, the 2026 robot",
      sponsors: "Sponsorship details",
      join: "Join the team",
    },
    notFound: {
      kicker: "Error 404",
      line1: "Not on",
      line2: "the field",
      body: "That page doesn't exist. Try one of these:",
    },
  },
  tr: {
    languageName: "Türkçe",
    switchTo: "English",
    switchLabel: "Read this page in English",
    breadcrumb: "Sayfa yolu",
    pagesNav: "Sayfalar",
    through: {
      history: "Tüm tarihçe ve sonuçlar",
      robot2026: "2026 robotumuz MT07",
      sponsors: "Sponsorluk ayrıntıları",
      join: "Takıma katıl",
    },
    notFound: {
      kicker: "Hata 404",
      line1: "Sahada",
      line2: "değil",
      body: "Böyle bir sayfa yok. Şunlardan birine göz atın:",
    },
  },
} as const;

/* --- Membership ------------------------------------------------------------ */

export const MEMBERSHIP_CLOSED = {
  en: {
    title: "Membership is closed.",
    body: "FRC 6874 is a school team made up of students of Özel Antalya Bahçeşehir Anadolu Lisesi, and we aren't taking new members right now. This form is for sponsors, mentors and general questions.",
  },
  tr: {
    title: "Üye alımı kapalı.",
    body: "FRC 6874, Özel Antalya Bahçeşehir Anadolu Lisesi öğrencilerinden oluşan bir okul takımı ve şu anda yeni üye almıyoruz. Bu form sponsorlar, mentorlar ve genel sorular için.",
  },
} as const;

/* --- History page table ---------------------------------------------------- */

export const SEASON_TABLE = {
  en: {
    caption: "Season by season",
    note: "Best qualification finish at a regional each season. Off-season events aren't included.",
    cols: ["Season", "Registered as", "Game", "Event", "Finish", "Playoffs"],
  },
  tr: {
    caption: "Sezon sezon",
    note: "Her sezon bir regional'daki en iyi sıralama derecesi. Off-season etkinlikleri dahil değil.",
    cols: ["Sezon", "Kayıtlı adı", "Oyun", "Yarışma", "Derece", "Playoff"],
  },
} as const;

/* --- MT07 page ------------------------------------------------------------- */

export const ROBOT_PAGE = {
  en: {
    factsTitle: "MT07 at a glance",
    facts: [
      ["Season", "2026"],
      ["Game", MT07.game],
      ["Event", `${MT07.event}, ${MT07.city}`],
      ["Qualification rank", `7th of ${MT07.teams}`],
      ["Qualification record", `${MT07.wins} wins, ${MT07.losses} losses`],
      ["Playoffs", `Captain of Alliance ${MT07.alliance}, with ${MT07.partners.join(" and ")}`],
    ],
    figure: "Illustration of a typical robot for the 2026 game, not a drawing of MT07.",
    specsTitle: "Design",
    // TODO: add MT07's real details (drivetrain, mechanisms, weight, photos).
    specsBody:
      "Photos and technical details of MT07 are coming. In the meantime, the team's full record is on The Blue Alliance.",
    tba: "See the team on The Blue Alliance",
    next: `Next: the ${site.team.season} robot for ${site.team.game}. The game is revealed on 9 January 2027.`,
  },
  tr: {
    factsTitle: "Bir bakışta MT07",
    facts: [
      ["Sezon", "2026"],
      ["Oyun", MT07.game],
      ["Yarışma", `${MT07.event}, ${MT07.city}`],
      ["Sıralama", `${MT07.teams} takım arasında 7.`],
      ["Sıralama maçları", `${MT07.wins} galibiyet, ${MT07.losses} mağlubiyet`],
      ["Playoff", `${MT07.partners.join(" ve ")} ile ${MT07.alliance}. İttifak kaptanı`],
    ],
    figure: "2026 oyunu için tipik bir robotun çizimi; MT07'nin kendisi değil.",
    specsTitle: "Tasarım",
    specsBody:
      "MT07'nin fotoğrafları ve teknik ayrıntıları yakında. Bu arada takımın tüm kaydı The Blue Alliance'ta.",
    tba: "Takımı The Blue Alliance'ta gör",
    next: `Sıradaki: ${site.team.game} için ${site.team.season} robotu. Oyun 9 Ocak 2027'de açıklanıyor.`,
  },
} as const;
