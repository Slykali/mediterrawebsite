"use client";

import { motion, type Variants } from "framer-motion";

import { ROBOTS, ordinal } from "@/lib/content";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

const REVEAL: Variants = {
  hidden: { clipPath: "inset(-40% 110% -40% -15%)" },
  show: { clipPath: "inset(-40% -15% -40% -15%)", transition: { duration: 1.4, ease: EASE_OUT } },
};

type FinishChartProps = {
  /** Sets the colour of lines, dots and labels (everything uses currentColor). */
  className?: string;
  /** Extra colour for the latest season's dot and label, e.g. "text-accent". */
  highlightClassName?: string;
  /** Font and size for the small labels. */
  labelClassName?: string;
};

/**
 * Best qualification finish per season, 1st place at the top line and last
 * place at the bottom. Labels are HTML rather than SVG text so they stay
 * readable at phone width; the SVG only draws the lines.
 */
export function FinishChart({
  className = "",
  highlightClassName = "",
  labelClassName = "font-mono text-[10px] sm:text-[11px]",
}: FinishChartProps) {
  const seasons = ROBOTS.filter((robot) => robot.rank && robot.teams);
  const points = seasons.map((robot, i) => ({
    robot,
    x: (i / (seasons.length - 1)) * 100,
    // 1st place → 0 (top), last place → 100 (bottom).
    y: ((robot.rank! - 1) / (robot.teams! - 1)) * 100,
  }));
  const line = points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  const summary = points
    .map(({ robot }) => `${robot.season}: ${ordinal(robot.rank!)} of ${robot.teams}`)
    .join(", ");

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={`Best qualification finish each season. ${summary}.`}
        className="relative h-56 sm:h-64"
      >
        <span aria-hidden className={`absolute top-6 left-0 -translate-y-1/2 opacity-60 ${labelClassName}`}>
          1st
        </span>
        <span aria-hidden className={`absolute bottom-10 left-0 translate-y-1/2 opacity-60 ${labelClassName}`}>
          Last
        </span>

        {/* Plot area. Inset leaves room for the axis words and season labels. */}
        <motion.div
          aria-hidden
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="absolute inset-x-10 top-6 bottom-10 sm:inset-x-14"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {[0, 50, 100].map((y) => (
              <line
                key={y}
                x1={0}
                x2={100}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity={y === 50 ? 0.15 : 0.3}
                strokeDasharray={y === 50 ? "2 3" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* Revealed left to right with a clip rather than pathLength, which
              doesn't work on a non-scaling stroke. The clip extends past the
              box (negative insets) so edge dots and their labels aren't cut.
              The parent owns the in-view trigger: Chrome counts an element's
              own clip-path when deciding whether it's visible, so a fully
              clipped element would never report itself in view. */}
          <motion.div className="absolute inset-0" variants={REVEAL}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={line} fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            </svg>

            {points.map(({ robot, x, y }, i) => {
              const latest = i === points.length - 1;
              return (
                <div key={robot.season} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <span
                    className={`absolute top-0 left-0 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-current ${
                      latest ? `size-3.5 bg-current ${highlightClassName}` : "size-2.5 bg-canvas"
                    }`}
                  />
                  {/* Always above the dot: below it would collide with the season labels. */}
                  <span
                    className={`absolute bottom-3 left-0 -translate-x-1/2 whitespace-nowrap ${labelClassName} ${
                      latest ? highlightClassName : ""
                    }`}
                  >
                    {robot.rank}/{robot.teams}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {points.map(({ robot, x }) => (
            <span
              key={robot.season}
              className={`absolute -bottom-8 -translate-x-1/2 opacity-70 ${labelClassName}`}
              style={{ left: `${x}%` }}
            >
              {robot.season}
            </span>
          ))}
        </motion.div>
      </div>
      <figcaption className={`mt-3 opacity-70 ${labelClassName}`}>
        Best qualification finish each season, from FIRST&rsquo;s event records.
      </figcaption>
    </figure>
  );
}
