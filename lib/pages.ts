/**
 * Page-level copy: titles, descriptions, headings and the bits of chrome that
 * sit outside the design's own sections (page header, FAQ, 404). Both languages.
 */

import { MT07 } from "./content";
import type { Locale } from "./i18n";
import { site } from "./site";

export type PageKey = "home" | "history" | "sponsors" | "join" | "robot2026" | "privacy" | "accessibility";

/** Locale-neutral paths. localePath() adds /tr. */
export const PAGE_PATHS: Record<PageKey, string> = {
  home: "/",
  history: "/history",
  sponsors: "/sponsors",
  join: "/join",
  robot2026: "/robot/2026",
  privacy: "/privacy",
  accessibility: "/accessibility",
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
      "FRC Team 6874 Mediterra, a FIRST Robotics Competition team from Döşemealtı, Antalya. 2026 Başkent Regional: 7th of 33 and Alliance 5 captain.",
    h1: "FRC 6874 Mediterra",
    kicker: "",
    intro: "",
    label: "Home",
  },
  history: {
    title: "Team History and Results, 2018–2026",
    description:
      "Every event FRC Team 6874 Mediterra has played since its 2018 rookie season, with rankings and playoff results from the official FIRST records.",
    h1: "History and results",
    kicker: "Match log · 2017–2027",
    intro:
      "The team has competed in FIRST Robotics Competition since its 2018 rookie season, registered as Imperium (2018, 2020, 2023), Lycia (2019) and, since 2024, Mediterra. Below is every event and result on record with FIRST and The Blue Alliance.",
    label: "History",
  },
  sponsors: {
    title: "Sponsors and Sponsorship",
    description:
      "The companies behind FRC Team 6874 Mediterra, a FIRST robotics team in Antalya, and how to sponsor the team: where the money goes and what sponsors get.",
    h1: "Sponsors",
    kicker: "Sponsors · since 2018",
    intro: `${site.team.school} has backed the team every season. MGA Airlines, Levent Kimya, Antera, Crystal Industrial, Bosch, SMC, Bahçeşehir Üniversitesi and Antalya Büyükşehir Belediyesi have backed it too, in the seasons listed below.`,
    label: "Sponsors",
  },
  join: {
    title: "Contact and Joining the Team",
    description:
      "FRC Team 6874 Mediterra is a school team and membership is currently closed. Sponsors, mentors and anyone with a question can get in touch here.",
    h1: "Contact",
    kicker: "School team · membership closed",
    intro:
      "FRC 6874 Mediterra is a school team made up of students of Özel Antalya Bahçeşehir Anadolu Lisesi, and we aren't taking new members right now. Companies that want to sponsor and engineers who could mentor can still write to us below, and someone on the team will answer.",
    label: "Contact",
  },
  robot2026: {
    title: "MT07, the 2026 Robot",
    description: `MT07, FRC Team 6874 Mediterra's 2026 robot (${MT07.game}): 7th of 33 at the Başkent Regional in Ankara, 8–2 in qualifications, Alliance 5 captain.`,
    h1: "MT07",
    kicker: "2026 robot · REBUILT",
    intro:
      "MT07 is the team's robot for the 2026 FIRST Robotics Competition season. It took the team to its best finish so far: 7th of 33 at the Başkent Regional in Ankara and captain of Alliance 5.",
    label: "MT07",
  },
  privacy: {
    title: "Privacy Notice",
    description:
      "What the FRC Team 6874 Mediterra website does with the name, email and message you send through its contact form, and how to have them deleted.",
    h1: "Privacy",
    kicker: "KVKK · GDPR",
    intro:
      "This site collects personal data in one place: the contact form. Here is what happens to it.",
    label: "Privacy",
  },
  accessibility: {
    title: "Accessibility Statement",
    description:
      "How the FRC Team 6874 Mediterra website works with a keyboard, screen readers and larger text, what still falls short, and how to tell us about a problem.",
    h1: "Accessibility",
    kicker: "WCAG 2.2 · AA",
    intro:
      "Everyone should be able to read this site and get in touch with the team, whatever they use to browse it. Here is what we've done, what isn't right yet, and how to tell us.",
    label: "Accessibility",
  },
};

const TR: Record<PageKey, PageCopy> = {
  home: {
    title: "FRC 6874 Mediterra | Antalya Robotik Takımı",
    description:
      "FRC 6874 Mediterra, Antalya Döşemealtı'ndan bir FIRST Robotics Competition takımı. 2026 Başkent Regional: 33 takım arasında 7. ve 5. İttifak kaptanı.",
    h1: "FRC 6874 Mediterra",
    kicker: "",
    intro: "",
    label: "Ana sayfa",
  },
  history: {
    title: "Takım Tarihçesi ve Sonuçlar, 2018–2026",
    description:
      "FRC 6874 Mediterra'nın 2018'deki çaylak sezonundan bu yana oynadığı tüm yarışmalar: resmi FIRST kayıtlarından sıralamalar ve playoff sonuçları.",
    h1: "Tarihçe ve sonuçlar",
    kicker: "Maç kaydı · 2017–2027",
    intro:
      "Takım, 2018'deki çaylak sezonundan bu yana FIRST Robotics Competition'da yarışıyor: Imperium (2018, 2020, 2023), Lycia (2019) ve 2024'ten beri Mediterra adıyla. Aşağıda FIRST ve The Blue Alliance kayıtlarındaki tüm yarışmalar ve sonuçlar var.",
    label: "Tarihçe",
  },
  sponsors: {
    title: "Sponsorlar ve Sponsorluk",
    description:
      "Antalya'daki FIRST robotik takımı FRC 6874 Mediterra'yı destekleyen şirketler ve takıma nasıl sponsor olunacağı: destek nereye gider, sponsorlar ne kazanır.",
    h1: "Sponsorlar",
    kicker: "Sponsorlar · 2018'den beri",
    intro: `${site.team.school} takımı her sezon destekledi. MGA Airlines, Levent Kimya, Antera, Crystal Industrial, Bosch, SMC, Bahçeşehir Üniversitesi ve Antalya Büyükşehir Belediyesi de aşağıda belirtilen sezonlarda destek verdi.`,
    label: "Sponsorlar",
  },
  join: {
    title: "İletişim ve Takıma Katılım",
    description:
      "FRC 6874 Mediterra bir okul takımı ve üye alımı şu anda kapalı. Sponsorlar, mentorlar ve sorusu olan herkes buradan bize ulaşabilir.",
    h1: "İletişim",
    kicker: "Okul takımı · üye alımı kapalı",
    intro:
      "FRC 6874 Mediterra, Özel Antalya Bahçeşehir Anadolu Lisesi öğrencilerinden oluşan bir okul takımı ve şu anda yeni üye almıyoruz. Sponsor olmak isteyen şirketler ve mentorluk yapabilecek mühendisler aşağıdan bize yazabilir; takımdan biri size dönecek.",
    label: "İletişim",
  },
  robot2026: {
    title: "MT07, 2026 Robotumuz",
    description: `MT07, FRC 6874 Mediterra'nın 2026 (${MT07.game}) robotu: Başkent Regional'da 33 takım arasında 7., 8 galibiyet 2 mağlubiyet ve 5. İttifak kaptanlığı.`,
    h1: "MT07",
    kicker: "2026 robotu · REBUILT",
    intro:
      "MT07, takımın 2026 FIRST Robotics Competition sezonundaki robotu. Takımı bugüne kadarki en iyi derecesine taşıdı: Ankara'daki Başkent Regional'da 33 takım arasında yedincilik ve 5. İttifak kaptanlığı.",
    label: "MT07",
  },
  privacy: {
    title: "Aydınlatma Metni",
    description:
      "FRC 6874 Mediterra web sitesinin iletişim formundan gönderdiğiniz ad, e-posta ve mesajla ne yaptığı, bunları ne kadar sakladığı ve nasıl sildirebileceğiniz.",
    h1: "Gizlilik",
    kicker: "KVKK aydınlatma metni",
    intro: "Bu site kişisel veriyi tek bir yerde topluyor: iletişim formu. Bu verilere ne olduğu aşağıda.",
    label: "Gizlilik",
  },
  accessibility: {
    title: "Erişilebilirlik Beyanı",
    description:
      "FRC 6874 Mediterra web sitesinin klavye, ekran okuyucu ve büyük yazıyla nasıl çalıştığı, nerede eksik olduğu ve bir sorunu nasıl bildirebileceğiniz.",
    h1: "Erişilebilirlik",
    kicker: "WCAG 2.2 · AA",
    intro:
      "Bu siteyi herkes, hangi araçla gezerse gezsin okuyabilmeli ve takıma ulaşabilmeli. Neler yaptığımız, neyin henüz tam olmadığı ve bize nasıl bildirebileceğiniz aşağıda.",
    label: "Erişilebilirlik",
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
    skip: "Skip to content",
    breadcrumb: "Breadcrumb",
    pagesNav: "Pages",
    through: {
      history: "Full history and results",
      robot2026: "MT07, the 2026 robot",
      sponsors: "Sponsorship details",
      join: "Contact",
    },
    privacy: "Privacy",
    accessibility: "Accessibility",
    firstNotice:
      "FIRST®, FIRST® Robotics Competition and FRC® are registered trademarks of FIRST® (www.firstinspires.org), which is not overseeing, involved with, or responsible for this website.",
    notFound: {
      kicker: "Error 404",
      line1: "Not on",
      line2: "the field",
      body: "That page doesn't exist. Try one of these:",
      imageAlt: "Pixel-art drawing of three team members in black 6874 shirts, shrugging.",
    },
  },
  tr: {
    languageName: "Türkçe",
    switchTo: "English",
    switchLabel: "Read this page in English",
    skip: "İçeriğe geç",
    breadcrumb: "Sayfa yolu",
    pagesNav: "Sayfalar",
    through: {
      history: "Tüm tarihçe ve sonuçlar",
      robot2026: "2026 robotumuz MT07",
      sponsors: "Sponsorluk ayrıntıları",
      join: "İletişim",
    },
    privacy: "Gizlilik",
    accessibility: "Erişilebilirlik",
    firstNotice:
      "FIRST®, FIRST® Robotics Competition ve FRC®, FIRST® (www.firstinspires.org) kuruluşunun tescilli markalarıdır. FIRST bu web sitesini denetlemez, siteyle ilgisi yoktur ve sitenin sorumluluğunu taşımaz.",
    notFound: {
      kicker: "Hata 404",
      line1: "Sahada",
      line2: "değil",
      body: "Böyle bir sayfa yok. Şunlardan birine göz atın:",
      imageAlt: "Siyah 6874 tişörtlü, omuz silken üç takım üyesinin piksel çizimi.",
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
    note: "Her sezon regional yarışmalarındaki en iyi sıralama derecesi. Off-season etkinlikleri dâhil değil.",
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
      "MT07'nin fotoğrafları ve teknik ayrıntıları yakında. Bu arada takımın tüm sonuçları The Blue Alliance'ta.",
    tba: "Takımı The Blue Alliance'ta görün",
    next: `Sıradaki: ${site.team.game} için ${site.team.season} robotu. Oyun 9 Ocak 2027'de açıklanıyor.`,
  },
} as const;

/* --- Privacy page ---------------------------------------------------------- */

// TODO: have the school's KVKK contact read this before launch. It names the
// school as data controller, which only the school can agree to.

export type PrivacySection = { title: string; body: string[] };

/** How to reach whoever handles requests: the email once it's set, Instagram until then. */
const REACH = site.contact.email ?? "Instagram (@team_6874)";

export const PRIVACY: Record<Locale, { updated: string; sections: PrivacySection[] }> = {
  en: {
    updated: "Last updated 1 October 2026",
    sections: [
      {
        title: "Who is responsible",
        body: [
          `FRC 6874 Mediterra is the robotics team of ${site.team.school} in ${site.team.city}. The school is the data controller for this site.`,
          `Questions and requests: ${REACH}.`,
        ],
      },
      {
        title: "What we collect",
        body: [
          "Only what you type into the contact form: your name, your email address, which option you picked and your message, plus the time it was sent.",
          "We don't use the form for anything else, and we don't store your IP address or browser with your message.",
        ],
      },
      {
        title: "Why",
        body: [
          "To answer you, and to talk about sponsoring or mentoring if that's what you wrote about. The legal basis is our legitimate interest in replying to people who contact us (KVKK article 5/2-f, GDPR article 6(1)(f)).",
          "We don't sell it, share it with anyone else or add you to a mailing list.",
        ],
      },
      {
        title: "Where it's kept",
        body: [
          "Messages are stored in a Supabase database. The site itself runs on Vercel. Both companies' servers are outside Türkiye, so sending the form means your data is transferred abroad (KVKK article 9).",
        ],
      },
      {
        title: "How long",
        body: ["Messages are deleted automatically 12 months after they arrive, or sooner if you ask."],
      },
      {
        title: "Cookies and statistics",
        body: [
          "No advertising or tracking cookies. One cookie, frc6874-booted, remembers for the current browser session that you've seen the opening animation, so it doesn't play on every page. A matching flag is kept in session storage. Both are deleted when you close the browser.",
          "If you change anything in the accessibility menu, your choices are kept in your browser's local storage (frc6874-a11y) so they stay on the next visit. They're never sent to us.",
          "Vercel Web Analytics counts page views without cookies and without identifying you.",
        ],
      },
      {
        title: "Under 18",
        body: ["If you're under 18, please ask a parent or teacher to write to us instead."],
      },
      {
        title: "Your rights",
        body: [
          "Under KVKK article 11 (and the GDPR, if you're in the EU) you can ask whether we hold data about you, get a copy, have it corrected or deleted, and object to how it's used.",
          `Write to ${REACH} and we'll answer within 30 days. You can also complain to Türkiye's Personal Data Protection Board (KVK Kurulu), or your own country's data protection authority.`,
        ],
      },
    ],
  },
  tr: {
    updated: "Son güncelleme: 1 Ekim 2026",
    sections: [
      {
        title: "Veri sorumlusu",
        body: [
          `FRC 6874 Mediterra, Antalya Döşemealtı'ndaki ${site.team.school}'nin robotik takımıdır. Bu sitenin veri sorumlusu okuldur.`,
          `Soru ve başvurular için: ${REACH}.`,
        ],
      },
      {
        title: "Hangi veriler",
        body: [
          "Yalnızca iletişim formuna yazdıklarınız: adınız, e-posta adresiniz, seçtiğiniz seçenek ve mesajınız, bir de gönderilme zamanı.",
          "Mesajınızla birlikte IP adresinizi ya da tarayıcı bilginizi saklamıyoruz.",
        ],
      },
      {
        title: "Ne amaçla",
        body: [
          "Size yanıt vermek ve yazdığınız konu buysa sponsorluk ya da mentorluk hakkında konuşmak için. Hukuki sebep, bize yazan kişilere yanıt vermekteki meşru menfaatimizdir (KVKK m.5/2-f).",
          "Verilerinizi satmıyor, kimseyle paylaşmıyor ve sizi bir e-posta listesine eklemiyoruz.",
        ],
      },
      {
        title: "Nerede saklanıyor",
        body: [
          "Mesajlar Supabase veritabanında saklanır. Site Vercel üzerinde çalışır. İki şirketin sunucuları da Türkiye dışındadır; formu göndermek verilerinizin yurt dışına aktarılması anlamına gelir (KVKK m.9).",
        ],
      },
      {
        title: "Ne kadar süre",
        body: ["Mesajlar geldikten 12 ay sonra otomatik olarak silinir. İsterseniz daha önce de sileriz."],
      },
      {
        title: "Çerezler ve istatistik",
        body: [
          "Reklam ya da takip çerezi yok. Tek bir çerez kullanılır: frc6874-booted. Giriş animasyonu her sayfada yeniden oynamasın diye, onu bu oturumda gördüğünüzü hatırlar. Oturum depolamasında da aynı amaçla bir işaret tutulur. İkisi de tarayıcıyı kapattığınızda silinir.",
          "Erişilebilirlik menüsünde bir ayar değiştirirseniz, seçimleriniz bir sonraki ziyarette de geçerli olsun diye tarayıcınızın yerel depolamasında (frc6874-a11y) saklanır. Bize hiçbir zaman gönderilmez.",
          "Vercel Web Analytics sayfa görüntülemelerini çerez kullanmadan ve kim olduğunuzu belirlemeden sayar.",
        ],
      },
      {
        title: "18 yaşından küçükseniz",
        body: ["Lütfen bize veliniz ya da öğretmeniniz yazsın."],
      },
      {
        title: "Haklarınız",
        body: [
          "KVKK m.11 uyarınca hakkınızda veri işlenip işlenmediğini öğrenebilir, bir kopyasını isteyebilir, düzeltilmesini ya da silinmesini talep edebilir ve işlenmesine itiraz edebilirsiniz.",
          `${REACH} üzerinden yazın, 30 gün içinde yanıt veririz. Kişisel Verileri Koruma Kurulu'na şikâyet hakkınız da saklıdır.`,
        ],
      },
    ],
  },
};

/* --- Accessibility statement ----------------------------------------------- */

export const ACCESSIBILITY: Record<Locale, { updated: string; sections: PrivacySection[] }> = {
  en: {
    updated: "Last reviewed 1 October 2026",
    sections: [
      {
        title: "What we aim for",
        body: [
          "Level AA of the Web Content Accessibility Guidelines (WCAG) 2.2. The team checked the site itself: with a keyboard, the browser's accessibility tree, contrast measurements and phone-sized screens. It hasn't been tested with every screen reader or had an independent audit.",
        ],
      },
      {
        title: "What works",
        body: [
          "Everything can be reached with the keyboard, focus is always visible, and a “Skip to content” link comes first on every page.",
          "Text colours meet AA contrast on the dark background. Every page sets its language, so screen readers read Turkish and English with the right pronunciation.",
          "Form fields have labels, errors are read out, and after a failed send the cursor moves to the first field that needs fixing.",
          "If your device is set to reduce motion, the opening animation, the sponsor ticker and the scroll effects don't run.",
        ],
      },
      {
        title: "Settings on this site",
        body: [
          "The button in the bottom-left corner opens a menu with larger text, higher contrast, a switch that stops every animation, underlined links and a plainer font. Your choices are saved in your browser.",
          "Browser zoom works too.",
        ],
      },
      {
        title: "What isn't right yet",
        body: [
          "The robot drawings are illustrations of a typical robot for each game, not our robots. Each one has a text description, but there are no photos yet.",
          "The sponsor ticker keeps moving unless you point at it, focus it, or turn on “Stop animations”.",
        ],
      },
      {
        title: "Tell us",
        body: [
          `If something doesn't work for you, write to ${REACH} and say which page and what you were trying to do. We'll answer within two weeks.`,
        ],
      },
    ],
  },
  tr: {
    updated: "Son kontrol: 1 Ekim 2026",
    sections: [
      {
        title: "Hedefimiz",
        body: [
          "Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.2'nin AA düzeyi. Siteyi takım kendisi kontrol etti: klavyeyle, tarayıcının erişilebilirlik ağacıyla, kontrast ölçümleriyle ve telefon boyutunda ekranlarda. Her ekran okuyucuyla denenmedi ve bağımsız bir denetimden geçmedi.",
        ],
      },
      {
        title: "Neler çalışıyor",
        body: [
          "Her şeye klavyeyle ulaşılabiliyor, odak her zaman görünüyor ve her sayfada ilk bağlantı “İçeriğe geç”.",
          "Yazı renkleri koyu zeminde AA kontrastını karşılıyor. Her sayfa dilini belirtiyor, bu yüzden ekran okuyucular Türkçe ve İngilizceyi doğru telaffuzla okuyor.",
          "Form alanlarının etiketleri var, hatalar sesli okunuyor ve gönderim başarısız olursa imleç düzeltilmesi gereken ilk alana gidiyor.",
          "Cihazınızda hareketi azaltma ayarı açıksa giriş animasyonu, sponsor bandı ve kaydırma efektleri çalışmaz.",
        ],
      },
      {
        title: "Bu sitedeki ayarlar",
        body: [
          "Sol alt köşedeki düğme bir menü açar: daha büyük yazı, yüksek kontrast, tüm animasyonları durduran bir düğme, altı çizili bağlantılar ve sade bir yazı tipi. Seçimleriniz tarayıcınızda saklanır.",
          "Tarayıcı yakınlaştırması da çalışır.",
        ],
      },
      {
        title: "Henüz tam olmayanlar",
        body: [
          "Robot çizimleri her oyun için tipik bir robotun illüstrasyonu, bizim robotlarımız değil. Her birinin metin açıklaması var ama henüz fotoğraf yok.",
          "Sponsor bandı, üzerine gelmediğiniz, odaklanmadığınız ya da “Animasyonları durdur” açık olmadığı sürece hareket eder.",
        ],
      },
      {
        title: "Bize bildirin",
        body: [
          `Bir şey sizin için çalışmıyorsa ${REACH} üzerinden yazın; hangi sayfada ve ne yapmaya çalışırken olduğunu söyleyin. İki hafta içinde yanıt veririz.`,
        ],
      },
    ],
  },
};
