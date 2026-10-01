"use client";

import { useContent } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { Barcode } from "@/components/shared/barcode";
import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { ThroughLink } from "@/components/shared/through-link";
import {
  REGIONAL_COUNT,
  SPONSORS,
  UNLOCKED_ROBOTS,
  formatSeasons,
  robotTitle,
  type Robot,
} from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
import { useCopy } from "./copy";
import { MONO, SectionHead, Slab, WIDE, WarningIcon } from "./ui";

const pad2 = (n: number) => String(n).padStart(2, "0");

/* --- 01: log (inverted) --------------------------------------------------- */

export function Timeline() {
  const c = useContent();
  const t = useCopy();
  return (
    <section id="timeline" className="bg-ink text-canvas">
      <SectionHead n="01" label={t.log}>
        {t.regionals(c.spell(REGIONAL_COUNT))}
        <br />
        {c.sinceRookie}.
      </SectionHead>

      <Reveal className="border-t-4 border-canvas px-4 py-10 sm:px-6">
        <p className={MONO}>{t.bestFinish}</p>
        <FinishChart className="mt-4 max-w-5xl text-canvas" labelClassName="font-mono text-[10px] font-semibold sm:text-xs" />
      </Reveal>

      <ol className="border-t-4 border-canvas">
        {c.timeline.map((entry) => {
          // The season just played is the one inverted row.
          const latest = entry.kind === "latest";
          return (
            <li key={entry.years} className={`border-b-4 border-canvas ${latest ? "bg-canvas text-ink" : ""}`}>
              <Reveal className="grid gap-4 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:items-baseline">
                <span className={`${WIDE} text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.04em] lg:col-span-4`}>
                  {entry.years}
                </span>
                <span className="lg:col-span-2">
                  <span className={`inline-flex items-center gap-2 border-2 px-2 py-1 ${MONO} ${latest ? "border-ink" : "border-canvas"}`}>
                    {entry.kind === "next" && <span className="size-2 animate-pulse bg-current" />}
                    {c.timelineLabel[entry.kind]}
                  </span>
                </span>
                <div className="lg:col-span-6">
                  <h3 className={`${WIDE} text-2xl sm:text-3xl`}>{entry.title}</h3>
                  <p className="mt-2 max-w-xl font-mono text-xs leading-relaxed sm:text-sm">{entry.body}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="px-4 py-8 sm:px-6">
        <ThroughLink page="history" />
      </div>
    </section>
  );
}

/* --- 02: inventory -------------------------------------------------------- */

function AssetTag({ robot, index }: { robot: Robot; index: number }) {
  const tag = `${site.team.number}-${pad2(index + 1)}`;
  const c = useContent();
  const t = useCopy();

  return (
    <article className="flex h-full flex-col bg-canvas">
      <header className={`flex items-center justify-between bg-ink px-4 py-2 text-canvas ${MONO}`}>
        <span>
          {t.asset} {tag}
        </span>
        <span>{robot.season}</span>
      </header>
      <div className="flex-1 px-4 py-6">
        <RobotGlyph kind={robot.kind} draw strokeWidth={2} label={c.glyphAlt(robot)} className="w-full text-ink" />
      </div>
      <div className="border-t-4 border-ink px-4 py-4">
        <h3 className={`${WIDE} text-2xl leading-none`}>{robotTitle(robot)}</h3>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px] uppercase">
          {robot.robotName && (
            <>
              <dt>{t.game}</dt>
              <dd className="font-semibold">{robot.game}</dd>
            </>
          )}
          <dt>{t.team}</dt>
          <dd className="font-semibold">{robot.teamName}</dd>
          <dt>{t.finish}</dt>
          <dd className="font-semibold">{c.finish(robot)}</dd>
          {robot.playoffs && (
            <>
              <dt>{t.playoffs}</dt>
              <dd className="font-semibold">{robot.playoffs}</dd>
            </>
          )}
        </dl>
      </div>
      <div className="border-t-4 border-ink px-4 py-3">
        <Barcode value={`${tag}-${robot.season}`} className="h-8 w-full text-ink" />
        <p className="mt-1 font-mono text-[10px] tracking-[0.3em]">
          {tag}-{robot.season}
        </p>
      </div>
    </article>
  );
}

function RestrictedTag({ robot }: { robot: Robot }) {
  const c = useContent();
  const t = useCopy();
  return (
    <article className="stripes h-full p-3">
      <div className="flex h-full flex-col bg-ink text-canvas">
        <header className={`flex items-center justify-between border-b-4 border-canvas px-4 py-2 ${MONO}`}>
          <span className="flex items-center gap-2">
            <WarningIcon className="h-4 w-4" mark="var(--ink)" />
            {t.restricted}
          </span>
          <span>{robot.season}</span>
        </header>
        <div className="relative flex flex-1 items-center justify-center px-4 py-8">
          <RobotGlyph kind={robot.kind} filled label={c.glyphAlt(robot)} className="w-full max-w-lg text-canvas" />
          <span aria-hidden className={`${WIDE} absolute text-[clamp(4rem,10vw,8rem)] text-ink`}>
            ?
          </span>
        </div>
        <div className="border-t-4 border-canvas px-4 py-4">
          <h3 className={`${WIDE} text-3xl leading-none`}>{robot.game}</h3>
          <p className="mt-2 font-mono text-xs uppercase">{t.lockedNote(c.kickoff)}</p>
        </div>
      </div>
    </article>
  );
}

export function Garage() {
  const c = useContent();
  const t = useCopy();
  return (
    <section id="garage">
      <SectionHead n="02" label={t.inventory}>
        {t.everyRobot}
        <br />
        {c.sinceRookie}.
      </SectionHead>
      <p className="-mt-4 max-w-md px-4 pb-10 font-mono text-xs uppercase sm:px-6">{t.drawingsNote}</p>

      {/* The 4px black gaps between cells act as the borders. */}
      <Stagger className="grid gap-1 border-y-4 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
        {c.robots.map((robot, i) => (
          <StaggerItem key={robot.season} className={robot.locked ? fillLastRow(UNLOCKED_ROBOTS) : ""}>
            {robot.locked ? <RestrictedTag robot={robot} /> : <AssetTag robot={robot} index={i} />}
          </StaggerItem>
        ))}
      </Stagger>

      <div className="px-4 py-8 sm:px-6">
        <ThroughLink page="robot2026" />
      </div>
    </section>
  );
}

/* --- 03: sponsors --------------------------------------------------------- */

export function Backers() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  return (
    <section id="backers" className="border-t-4 border-ink">
      <div className="bg-ink py-6 text-canvas">
        <Marquee baseVelocity={-0.03} repeat={3} itemClassName="">
          {SPONSORS.map((sponsor) => (
            <span key={sponsor.name} className="flex items-center">
              <span className={`${WIDE} px-6 text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.03em]`}>
                {sponsor.name}
              </span>
              <WarningIcon className="h-8 w-8" mark="var(--ink)" />
            </span>
          ))}
        </Marquee>
      </div>
      <div aria-hidden className="stripes stripes-move h-6 border-y-4 border-ink" />

      <SectionHead n="03" label={t.sponsors}>
        {t.sponsors}.
      </SectionHead>
      <div className="-mt-4 px-4 pb-10 sm:px-6">
        <p className="max-w-lg font-mono text-xs leading-relaxed uppercase">{t.sponsorsNote}</p>
        <ThroughLink page="sponsors" className="mt-6" />
      </div>

      <div className="grid gap-1 border-y-4 border-ink bg-ink md:grid-cols-3">
        {c.pitch.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="bg-canvas p-4 sm:p-6">
            <span className={`${WIDE} text-5xl leading-none`}>0{i + 1}</span>
            <h3 className="mt-4 font-mono text-sm font-semibold tracking-[0.14em] uppercase">{item.title}</h3>
            <p className="mt-2 font-mono text-xs leading-relaxed">{item.body}</p>
          </Reveal>
        ))}
      </div>

      <table className="w-full border-collapse">
        <caption className="sr-only">{t.sponsorsCaption}</caption>
        <tbody>
          {SPONSORS.map((sponsor) => (
            <tr key={sponsor.name} className="border-b-4 border-ink">
              <th scope="row" className={`px-4 py-3 text-left align-top sm:px-6 ${WIDE} text-lg sm:text-2xl`}>
                {sponsor.name}
              </th>
              <td className={`w-40 px-4 py-3 text-right align-top sm:w-56 sm:px-6 ${MONO}`}>
                {formatSeasons(sponsor.seasons)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Stagger>
        <Slab href={href("contact")} dark>
          {t.sponsorTeam}
        </Slab>
      </Stagger>
    </section>
  );
}

/* --- Footer --------------------------------------------------------------- */

export function Footer() {
  const { team, contact } = site;
  const c = useContent();

  return (
    <footer className="bg-ink text-canvas">
      <div aria-hidden className="stripes h-4 [--stripe-a:var(--canvas)] [--stripe-b:var(--ink)]" />
      <div className="overflow-hidden px-3 py-10 sm:px-5">
        <p className={`${WIDE} text-[clamp(5rem,24vw,24rem)] leading-[0.76] tracking-[-0.05em]`}>{team.number}</p>
      </div>
      <div className={`flex flex-wrap items-center justify-between gap-4 border-t-4 border-canvas px-4 py-4 sm:px-6 ${MONO}`}>
        <span>
          &copy; {new Date().getFullYear()} FRC {team.number} {team.name}
        </span>
        <nav className="flex flex-wrap gap-5">
          <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
            {c.email}
          </a>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="underline-offset-4 hover:underline">
          {c.backToTop} &uarr;
        </a>
      </div>
    </footer>
  );
}
