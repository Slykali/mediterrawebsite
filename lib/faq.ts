/**
 * The homepage FAQ. The visible section and the FAQPage structured data both
 * render from this, so they can't drift apart. Plain strings only: the schema
 * needs exactly the text people see.
 */

import type { Locale } from "./i18n";

export type FaqItem = { question: string; answer: string };

export const FAQ_HEADING: Record<Locale, { kicker: string; title: string }> = {
  en: { kicker: "FAQ", title: "Questions" },
  tr: { kicker: "SSS", title: "Sık sorulanlar" },
};

export const FAQ: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "Who can join FRC 6874 Mediterra?",
      answer:
        "FRC 6874 Mediterra is a school team: only students of Özel Antalya Bahçeşehir Anadolu Lisesi in Döşemealtı, Antalya can join. The team isn't taking new members at the moment. Companies and engineers who want to sponsor or mentor can still get in touch through the form on the Join page.",
    },
    {
      question: "How can a company sponsor the team?",
      answer:
        "Sponsors can give money, materials, machining time or mentoring. It pays for regional registration, parts, batteries and getting the robot and team to events in İstanbul and Ankara. Sponsors get their logo on the robot, in the pit and on team shirts, and a place on the website. Get in touch through the Join page and we'll work out what fits.",
    },
    {
      question: "Where is the team based?",
      answer:
        "In Döşemealtı, Antalya, Türkiye. The team has been backed every season by Özel Antalya Bahçeşehir Anadolu Lisesi.",
    },
    {
      question: "What is FIRST Robotics Competition?",
      answer:
        "FIRST Robotics Competition (FRC) is an international robotics competition for high-school teams run by FIRST. Each January a new game is revealed at kickoff, and teams design, build and program a robot to play it at regional events. The 2027 game, BIOCORE, is revealed on 9 January 2027.",
    },
    {
      question: "What were the team's best results?",
      answer:
        "The best so far is 2026: with the robot MT07 the team finished 7th of 33 at the Başkent Regional in Ankara, won 8 and lost 2 qualification matches, and captained Alliance 5 with teams 8828 and 6430. In 2024 it finished 10th of 53 at the Marmara Regional and was first pick of Alliance 5, and in its 2018 rookie season it won the Highest Rookie Seed and Rookie All Star awards at the Central Illinois Regional.",
    },
  ],
  tr: [
    {
      question: "FRC 6874 Mediterra'ya kimler katılabilir?",
      answer:
        "FRC 6874 Mediterra bir okul takımı: yalnızca Döşemealtı, Antalya'daki Özel Antalya Bahçeşehir Anadolu Lisesi öğrencileri katılabilir. Takım şu anda yeni üye almıyor. Sponsor olmak ya da mentorluk yapmak isteyen şirketler ve mühendisler Katıl sayfasındaki formdan yine de bize ulaşabilir.",
    },
    {
      question: "Bir şirket takıma nasıl sponsor olabilir?",
      answer:
        "Sponsorlar para, malzeme, tezgâh zamanı ya da mentorluk desteği verebilir. Bu destek regional kayıt ücretlerini, parçaları, aküleri ve robotla takımın İstanbul ve Ankara'daki yarışmalara gitmesini karşılar. Sponsorların logosu robotta, pitte ve takım tişörtlerinde, adı da web sitesinde yer alır. Katıl sayfasından bize ulaşın, size uyanı birlikte bulalım.",
    },
    {
      question: "Takım nerede?",
      answer:
        "Döşemealtı, Antalya, Türkiye'de. Takımı her sezon Özel Antalya Bahçeşehir Anadolu Lisesi destekledi.",
    },
    {
      question: "FIRST Robotics Competition nedir?",
      answer:
        "FIRST Robotics Competition (FRC), FIRST'ün lise takımları için düzenlediği uluslararası bir robotik yarışması. Her ocak ayında kickoff'ta yeni bir oyun açıklanır; takımlar bu oyunu oynayacak robotu tasarlar, üretir, programlar ve regional yarışmalarda sahaya çıkar. 2027 oyunu BIOCORE, 9 Ocak 2027'de açıklanıyor.",
    },
    {
      question: "Takımın en iyi sonuçları neler?",
      answer:
        "Bugüne kadarki en iyisi 2026: takım, MT07 robotuyla Ankara'daki Başkent Regional'da 33 takım arasında 7. oldu, sıralama maçlarında 8 galibiyet 2 mağlubiyet aldı ve 8828 ile 6430 numaralı takımlarla 5. İttifak'ın kaptanı oldu. 2024'te Marmara Regional'da 53 takım arasında 10. olup 5. İttifak'ın ilk seçimi oldu; 2018'deki çaylak sezonunda ise Central Illinois Regional'da Highest Rookie Seed ve Rookie All Star ödüllerini kazandı.",
    },
  ],
};
