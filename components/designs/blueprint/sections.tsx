"use client";

import { FinishChart } from "@/components/shared/finish-chart";
import { Marquee } from "@/components/shared/marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { RobotGlyph } from "@/components/shared/robot-glyph";
import { PITCH, ROBOTS, SPONSORS, TIMELINE, finish, formatSeasons, type Robot } from "@/lib/content";
import { LINKS, site } from "@/lib/site";
import { fillLastRow } from "@/lib/utils";
import { Corners, MONO, PAD, REV, RevMark, STATUS, SheetHeader } from "./ui";

/* --- Sheet 02: revision history ------------------------------------------ */

export function Timeline() {
  return (
    <section id="timeline" className={`py-20 ${PAD}`}>
      <SheetHeader
        sheet="02"
        title="Revision history"
        note="Every season on FIRST's record, starting with the 2017 off-season in İstanbul."
      />

      <Reveal className="mt-10 border border-ink/40 p-4 sm:p-6">
        <p className={`text-mute ${MONO}`}>Chart 1 &middot; best qualification finish per season</p>
        <FinishChart className="mt-4 text-ink" highlightClassName="text-accent" />
      </Reveal>

      <div className={`mt-10 hidden grid-cols-12 gap-6 border-b border-ink/60 pb-2 text-mute sm:grid ${MONO}`}>
        <span className="col-span-1">Rev</span>
        <span className="col-span-2">Year</span>
        <span className="col-span-7">Description</span>
        <span className="col-span-2 text-right">Status</span>
      </div>

      <ol>
        {TIMELINE.map((entry, i) => {
          const status = STATUS[entry.kind];
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
                  <span className={`inline-block border px-2 py-1 ${MONO} ${status.tone}`}>{status.label}</span>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* --- Sheet 03: detail views ---------------------------------------------- */

function DetailCard({ robot, letter }: { robot: Robot; letter: string }) {
  const cell = "border-r border-b border-ink/40 px-3 py-2";

  return (
    <article className="relative h-full border border-ink/50 bg-panel/40 p-4">
      <Corners />
      <header className={`flex justify-between ${MONO}`}>
        <span>Detail {letter}</span>
        <span className="text-mute">{robot.season}</span>
      </header>

      <div className="relative my-4 flex aspect-[4/3] items-center justify-center overflow-hidden border border-dashed border-ink/30">
        {robot.locked ? (
          <>
            <div aria-hidden className="hatch absolute inset-0 text-ink/15" />
            <span className="relative -rotate-6 border-2 border-accent bg-canvas px-3 py-1 font-mono text-xs tracking-[0.25em] text-accent uppercase">
              Not for release
            </span>
          </>
        ) : (
          <RobotGlyph kind={robot.kind} draw strokeWidth={1.1} className="w-[88%] text-ink" />
        )}
      </div>

      <dl className={`grid grid-cols-2 border-t border-l border-ink/40 ${MONO}`}>
        <div className={cell}>
          <dt className="text-[9px] text-mute">Game</dt>
          <dd className="mt-0.5">{robot.game}</dd>
        </div>
        <div className={cell}>
          <dt className="text-[9px] text-mute">Team name</dt>
          <dd className="mt-0.5">{robot.teamName}</dd>
        </div>
        <div className={`${cell} col-span-2`}>
          <dt className="text-[9px] text-mute">{robot.locked ? "Status" : "Best finish"}</dt>
          <dd className="mt-0.5">
            {robot.locked ? `Revealed ${site.team.kickoff}` : finish(robot)}
            {robot.playoffs && <span className="block text-mute">{robot.playoffs}</span>}
          </dd>
        </div>
        {robot.robotName && (
          <div className={`${cell} col-span-2`}>
            <dt className="text-[9px] text-mute">Robot</dt>
            <dd className="mt-0.5 text-accent">{robot.robotName}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}

export function Garage() {
  return (
    <section id="garage" className={`py-20 ${PAD}`}>
      <SheetHeader
        sheet="03"
        title="Detail views"
        note={`One detail per season competed. Illustrations of a typical robot for each game, not drawings of ours. Detail ${REV[ROBOTS.length - 1]} is withheld until the game is released.`}
      />
      <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ROBOTS.map((robot, i) => (
          <StaggerItem key={robot.season}>
            <DetailCard robot={robot} letter={REV[i]} />
          </StaggerItem>
        ))}
        <StaggerItem className={fillLastRow(ROBOTS.length)}>
          <a
            href="#contact"
            className="group flex h-full min-h-64 flex-col justify-between border border-dashed border-ink/40 p-4 transition-colors hover:border-accent"
          >
            <span className={`text-mute ${MONO}`}>Detail {REV[ROBOTS.length]}</span>
            <span className="font-display text-3xl leading-tight font-semibold uppercase">
              Yours.
              <span className="block text-accent group-hover:underline">Join the team &rarr;</span>
            </span>
          </a>
        </StaggerItem>
      </Stagger>
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
  return (
    <section id="backers" className="py-20">
      <div className={PAD}>
        <SheetHeader
          sheet="04"
          title="Suppliers"
          note={`Companies named in the team's FIRST registration, by season. ${site.team.school} has backed every season.`}
        />
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
          {PITCH.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="border-t border-ink/40 pt-4">
              <p className={`text-accent ${MONO}`}>Note {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold uppercase">{item.title}</h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-mute">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-5">
          <table className={`w-full border-collapse text-left ${MONO}`}>
            <caption className="pb-2 text-left text-mute">Supplier list</caption>
            <thead>
              <tr className="text-mute">
                <th scope="col" className="pb-2 font-normal">
                  Supplier
                </th>
                <th scope="col" className="pb-2 text-right font-normal">
                  Seasons
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

      <div className={`mt-12 ${PAD}`}>
        <a
          href="#contact"
          className="inline-flex border border-ink px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-canvas"
        >
          Become a supplier &rarr;
        </a>
      </div>
    </section>
  );
}

/* --- General notes -------------------------------------------------------- */

export function Footer() {
  const { team, contact } = site;

  return (
    <footer className={`pb-16 ${PAD}`}>
      <div className="grid gap-10 border-t border-ink/40 pt-8 md:grid-cols-2">
        <div>
          <p className={`text-mute ${MONO}`}>General notes</p>
          <ol className="mt-3 space-y-1.5 font-mono text-[11px] tracking-[0.08em] text-ink/85 uppercase">
            <li>1. Do not scale drawing.</li>
            <li>2. Results from FIRST event records and The Blue Alliance.</li>
            <li>3. Robot drawings are illustrations, not as-built.</li>
            <li>
              4. Questions &rarr;{" "}
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
            Back to sheet 01 &uarr;
          </a>
          <span className="mt-4 text-mute">
            &copy; {new Date().getFullYear()} FRC {team.number} {team.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
