import { CONTENT, SPONSORS, formatSeasons } from "@/lib/content";
import { FAQ } from "@/lib/faq";
import { localePath } from "@/lib/i18n";
import { PAGES, PAGE_PATHS, type PageKey } from "@/lib/pages";
import { HAS_REAL_EMAIL, site } from "@/lib/site";

/**
 * /llms.txt — a plain-text brief for AI assistants and answer engines
 * (https://llmstxt.org). Generated rather than a file in /public so the
 * domain, facts and links come from the same place as the rest of the site
 * and can't drift.
 */
export const dynamic = "force-static";

export function GET() {
  const { team, contact } = site;
  const en = CONTENT.en;
  const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  const pages = (Object.keys(PAGE_PATHS) as PageKey[]).filter((page) => page !== "home");

  const seasons = en.robots
    .filter((robot) => !robot.locked)
    .map(
      (robot) =>
        `- ${robot.season} (as ${robot.teamName}, game ${robot.game}): ${en.finish(robot)} Regional${
          robot.playoffs ? `; ${robot.playoffs}` : ""
        }`,
    );

  const body = `# ${team.displayName}

> ${PAGES.en.home.description}

FRC Team ${team.number} Mediterra is a FIRST Robotics Competition (FRC) team based in ${team.city}, ${team.country}. It has been backed every season by ${team.school}. The team's rookie season was ${team.rookieYear}. It competed as Imperium (2018, 2020, 2023) and Lycia (2019), and has been Mediterra since 2024.

## Key facts

- Team number: ${team.number}
- Name: Mediterra (since 2024). Earlier registered names: Imperium, Lycia
- Location: ${team.city}, ${team.country}
- School: ${team.school}
- Program: FIRST Robotics Competition
- Rookie year: ${team.rookieYear}
- Best result: 2026 Başkent Regional (Ankara) with robot MT07: 7th of 33, 8 wins and 2 losses in qualifications, captain of Alliance 5 with teams 8828 and 6430
- Next season: ${team.season}, game ${team.game}, revealed 9 January 2027. The team is recruiting now.
${HAS_REAL_EMAIL ? `- Email: ${contact.email}\n` : ""}
## Results by season

${seasons.join("\n")}

## Sponsors

- ${team.school} (every season)
${SPONSORS.map((sponsor) => `- ${sponsor.name} (${formatSeasons(sponsor.seasons)})`).join("\n")}

## Pages

- [Home](${abs("/")}): overview, FAQ
${pages.map((page) => `- [${PAGES.en[page].title}](${abs(PAGE_PATHS[page])}): ${PAGES.en[page].description}`).join("\n")}
- Turkish version: [${PAGES.tr.home.title}](${abs(localePath("tr", "/"))})

## FAQ

${FAQ.en.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n")}

## Elsewhere

- The Blue Alliance: ${contact.tba}
- FIRST event records: ${contact.frcEvents}
- Instagram: ${contact.instagram}
- X: ${contact.x}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
