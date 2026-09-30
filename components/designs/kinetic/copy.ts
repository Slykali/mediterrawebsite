import { useLocale } from "@/components/i18n/locale-provider";
import { site } from "@/lib/site";

const { team } = site;

const en = {
  weAreBack: "We are back ·",
  statement: `We’re the FRC team of ${team.school}. Last season we finished 7th of 33 at the Başkent Regional and captained Alliance 5. The ${team.season} game, ${team.game}, is revealed on 9 January 2027.`,
  joinTeam: "Join the team",
  sponsorTeam: "Sponsor the team",
  spinningUp: "Spinning up",
  timeline: "Timeline",
  regionals: (count: string) => `${count} regionals`,
  garage: "The garage",
  robots: (n: number) => `${n} robots`,
  everyRobot: "Every robot",
  garageNote:
    "The drawings show a typical robot for each year’s game, not our machines. Results are each season’s best qualification finish.",
  as: (name: string) => `As ${name}`,
  locked: "Locked",
  lockedNote: "The game is revealed on 9 January 2027. Nothing to show until then.",
  sponsors: "Sponsors",
  companiesSince: (n: number) => `${n} companies since ${team.rookieYear}`,
  sponsorsNote: `${team.school} has backed the team every season. These companies have too, in the years listed.`,
  contact: "Contact",
  replies: "Replies in a few days",
  talk: ["Talk", "to us"],
  contactNote:
    "Students who want to join, companies that want to sponsor, engineers who could mentor: write to us and someone on the team will answer.",
  results: "Results",
  name: "Name",
  namePlaceholder: "Your name",
  emailPlaceholder: "you@example.com",
  iWantTo: "I want to",
  message: "Message",
  messagePlaceholder: "What’s on your mind",
  send: "Send it",
  sending: "Sending…",
};

const tr: typeof en = {
  weAreBack: "Geri döndük ·",
  statement: `${team.school}'nin FRC takımıyız. Geçen sezon Başkent Regional'da 33 takım arasında 7. olduk ve 5. İttifak'ın kaptanıydık. ${team.season} oyunu ${team.game}, 9 Ocak 2027'de açıklanıyor.`,
  joinTeam: "Takıma katıl",
  sponsorTeam: "Sponsor ol",
  spinningUp: "Isınıyor",
  timeline: "Tarihçe",
  regionals: (count: string) => `${count} regional`,
  garage: "Garaj",
  robots: (n: number) => `${n} robot`,
  everyRobot: "Her robotumuz",
  garageNote:
    "Çizimler her yılın oyunu için tipik bir robotu gösteriyor, bizim robotlarımızı değil. Sonuçlar her sezonun en iyi sıralama derecesi.",
  as: (name: string) => `${name} adıyla`,
  locked: "Kilitli",
  lockedNote: "Oyun 9 Ocak 2027'de açıklanıyor. O güne kadar gösterecek bir şey yok.",
  sponsors: "Sponsorlar",
  companiesSince: (n: number) => `${team.rookieYear}'den beri ${n} şirket`,
  sponsorsNote: `${team.school} takımı her sezon destekledi. Bu şirketler de yazan yıllarda destek verdi.`,
  contact: "İletişim",
  replies: "Birkaç gün içinde yanıt",
  talk: ["Bize", "yazın"],
  contactNote:
    "Katılmak isteyen öğrenciler, sponsor olmak isteyen şirketler, mentorluk yapabilecek mühendisler: bize yazın, takımdan biri yanıt verecek.",
  results: "Sonuçlar",
  name: "Ad",
  namePlaceholder: "Adınız",
  emailPlaceholder: "siz@ornek.com",
  iWantTo: "Ne istiyorsunuz",
  message: "Mesaj",
  messagePlaceholder: "Aklınızdan ne geçiyor",
  send: "Gönder",
  sending: "Gönderiliyor…",
};

export function useCopy() {
  return useLocale() === "tr" ? tr : en;
}
