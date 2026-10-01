"use client";

import { useContent } from "@/components/i18n/locale-provider";
import { useSectionHref } from "@/components/i18n/nav";
import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { ThroughLink } from "@/components/shared/through-link";
import { SPONSORS, formatSeasons, type Robot } from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
import { useCopy } from "./copy";
import { Corners, MONO, PAD, REV, RevMark, STATUS_TONE, SheetHeader } from "./ui";

/* --- Sheet 02: revision history ------------------------------------------ */

export function Timeline() {
  const c = useContent();
  const t = useCopy();
  return (
    <section id="timeline" className={`py-20 ${PAD}`}>
      <SheetHeader sheet="02" title={t.revisionHistory} note={t.revisionNote} />

      <Reveal className="mt-10 border border-ink/40 p-4 sm:p-6">
        <p className={`text-mute ${MONO}`}>{t.chart1}</p>
        <FinishChart className="mt-4 text-ink" highlightClassName="text-accent" />
      </Reveal>

      <div className={`mt-10 hidden grid-cols-12 gap-6 border-b border-ink/60 pb-2 text-mute sm:grid ${MONO}`}>
        <span className="col-span-1">{t.cols[0]}</span>
        <span className="col-span-2">{t.cols[1]}</span>
        <span className="col-span-7">{t.cols[2]}</span>
        <span className="col-span-2 text-right">{t.cols[3]}</span>
      </div>

      <ol>
        {c.timeline.map((entry, i) => {
          return (
            <li key={entry.years} className="relative border-b border-ink/30">
              <Reveal className="relative grid gap-3 py-6 sm:grid-cols-12 sm:gap-6">
                <div className="sm:col-span-1">
                  <RevMark letter={REV[i]} active={entry.kind === "latest"} />
                </div>
                <div className="font-display text-3xl leading-none font-semibold sm:col-span-2">{entry.years}</div>
                <div className="sm:col-span-7">
                  <h3 className="font-display text-xl font-semibold uppercase">{entry.title}</h3>
                  <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-mute">{entry.body}</p>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <span className={`inline-block border px-2 py-1 ${MONO} ${STATUS_TONE[entry.kind]}`}>
                    {t.status[entry.kind]}
                  </span>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        <ThroughLink page="history" />
      </div>
    </section>
  );
}

/* --- Sheet 03: detail views ---------------------------------------------- */

function DetailCard({ robot, letter }: { robot: Robot; letter: string }) {
  const c = useContent();
  const t = useCopy();
  const cell = "border-r border-b border-ink/40 px-3 py-2";

  return (
    <article className="relative h-full border border-ink/50 bg-panel/40 p-4">
      <Corners />
      <header className={`flex justify-between ${MONO}`}>
        <span>
          {t.detail} {letter}
        </span>
        <span className="text-mute">{robot.season}</span>
      </header>

      <div className="relative my-4 flex aspect-[4/3] items-center justify-center overflow-hidden border border-dashed border-ink/30">
        {robot.locked ? (
          <>
            <div aria-hidden className="hatch absolute inset-0 text-ink/15" />
            <span className="relative -rotate-6 border-2 border-accent bg-canvas px-3 py-1 font-mono text-xs tracking-[0.25em] text-accent uppercase">
              {t.notForRelease}
            </span>
          </>
        ) : (
          <RobotGlyph kind={robot.kind} draw strokeWidth={1.1} label={c.glyphAlt(robot)} className="w-[88%] text-ink" />
        )}
      </div>

      <dl className={`grid grid-cols-2 border-t border-l border-ink/40 ${MONO}`}>
        <div className={cell}>
          <dt className="text-[9px] text-mute">{t.game}</dt>
          <dd className="mt-0.5">{robot.game}</dd>
        </div>
        <div className={cell}>
          <dt className="text-[9px] text-mute">{t.teamName}</dt>
          <dd className="mt-0.5">{robot.teamName}</dd>
        </div>
        <div className={`${cell} col-span-2`}>
          <dt className="text-[9px] text-mute">{robot.locked ? t.statusLabel : t.bestFinish}</dt>
          <dd className="mt-0.5">
            {robot.locked ? t.revealed(c.kickoff) : c.finish(robot)}
            {robot.playoffs && <span className="block text-mute">{robot.playoffs}</span>}
          </dd>
        </div>
        {robot.robotName && (
          <div className={`${cell} col-span-2`}>
            <dt className="text-[9px] text-mute">{t.robot}</dt>
            <dd className="mt-0.5 text-accent">{robot.robotName}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function Garage() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  return (
    <section id="garage" className={`py-20 ${PAD}`}>
      <SheetHeader sheet="03" title={t.detailViews} note={t.detailNote(REV[c.robots.length - 1])} />
      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {c.robots.map((robot, i) => (
          <StaggerItem key={robot.season}>
            <DetailCard robot={robot} letter={REV[i]} />
          </StaggerItem>
        ))}
        <StaggerItem className={fillLastRow(c.robots.length)}>
          <a
            href={href("contact")}
            className="group flex h-full min-h-64 flex-col justify-between border border-dashed border-ink/40 p-4 transition-colors hover:border-accent"
          >
            <span className={`text-mute ${MONO}`}>
              {t.detail} {REV[c.robots.length]}
            </span>
            <span className="font-display text-3xl leading-tight font-semibold uppercase">
              {t.yours}
              <span className="block text-accent group-hover:underline">{t.joinTeam} &rarr;</span>
            </span>
          </a>
        </StaggerItem>
      </Stagger>

      <div className="mt-10">
        <ThroughLink page="robot2026" />
      </div>
    </section>
  );
}

/* --- Sheet 04: suppliers ------------------------------------------------- */

function RulerTicks() {
  return (
    <svg viewBox="0 0 60 16" className="h-4 w-16 text-ink/50" aria-hidden>
      {Array.from({ length: 13 }, (_, i) => (
        <line key={i} x1={i * 5} y1={16} x2={i * 5} y2={i % 6 === 0 ? 2 : i % 2 === 0 ? 8 : 11} stroke="currentColor" />
      ))}
    </svg>
  );
}

export function Backers() {
  const c = useContent();
  const t = useCopy();
  const href = useSectionHref();
  return (
    <section id="backers" className="py-20">
      <div className={PAD}>
        <SheetHeader sheet="04" title={t.suppliers} note={t.suppliersNote} />
      </div>

      <div className="mt-10 border-y border-ink/40 bg-panel/40">
        <Marquee baseVelocity={-0.035} repeat={3} itemClassName="">
          {SPONSORS.map((sponsor) => (
            <span key={sponsor.name} className="flex items-center">
              <span className="px-8 py-5 font-display text-3xl font-semibold uppercase sm:text-4xl">{sponsor.name}</span>
              <RulerTicks />
            </span>
          ))}
        </Marquee>
      </div>

      <div className={`mt-12 grid gap-10 lg:grid-cols-12 ${PAD}`}>
        <div className="grid gap-6 md:grid-cols-3 lg:col-span-7">
          {c.pitch.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="border-t border-ink/40 pt-4">
              <p className={`text-accent ${MONO}`}>
                {t.note} {i + 1}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold uppercase">{item.title}</h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-mute">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-5">
          <table className={`w-full border-collapse text-left ${MONO}`}>
            <caption className="pb-2 text-left text-mute">{t.sponsorsCaption}</caption>
            <thead>
              <tr className="text-mute">
                <th scope="col" className="pb-2 font-normal">
                  {t.supplier}
                </th>
                <th scope="col" className="pb-2 text-right font-normal">
                  {t.seasons}
                </th>
              </tr>
            </thead>
            <tbody>
              {SPONSORS.map((sponsor) => (
                <tr key={sponsor.name} className="border-t border-ink/40">
                  <th scope="row" className="py-2 pr-4 font-normal">
                    {sponsor.name}
                  </th>
                  <td className="py-2 text-right text-mute">{formatSeasons(sponsor.seasons)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>

      <div className={`mt-12 flex flex-wrap items-center gap-8 ${PAD}`}>
        <a
          href={href("contact")}
          className="inline-flex border border-ink px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-canvas"
        >
          {t.becomeSupplier} &rarr;
        </a>
        <ThroughLink page="sponsors" />
      </div>
    </section>
  );
}

/* --- General notes -------------------------------------------------------- */

export function Footer() {
  const { team, contact } = site;
  const t = useCopy();

  return (
    <footer className={`pb-16 ${PAD}`}>
      <div className="grid gap-10 border-t border-ink/40 pt-8 md:grid-cols-2">
        <div>
          <p className={`text-mute ${MONO}`}>{t.generalNotes}</p>
          <ol className="mt-3 space-y-1.5 font-mono text-[11px] tracking-[0.08em] text-ink/85 uppercase">
            {t.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
            <li>
              {t.questions} &rarr;{" "}
              <a href={`mailto:${contact.email}`} className="normal-case underline decoration-ink/40 hover:text-accent">
                {contact.email}
              </a>
            </li>
          </ol>
        </div>
        <div className={`flex flex-col gap-2 md:items-end ${MONO}`}>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              {link.label} &#8599;
            </a>
          ))}
          <a href="#top" className="transition-colors hover:text-accent">
            {t.backToSheet} &uarr;
          </a>
          <span className="mt-4 text-mute">
            &copy; {new Date().getFullYear()} FRC {team.number} {team.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
