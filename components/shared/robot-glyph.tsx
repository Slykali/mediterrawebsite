"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";

import type { GlyphKind } from "@/lib/content";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/*
 * Side-elevation line drawings, one per robot archetype, built from plain
 * geometry so every design can restyle them with currentColor. No photos
 * needed to make the garage look like a garage.
 *
 * Every shape winds clockwise, so the filled silhouette (the locked robot) is
 * one solid mass instead of punching holes where parts overlap.
 */

const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y}h${w}v${h}h${-w}Z`;
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 2} 0`;
const line = (x1: number, y1: number, x2: number, y2: number) => `M${x1} ${y1}L${x2} ${y2}`;

const GROUND = line(6, 166, 234, 166);
const CHASSIS = [rect(20, 116, 200, 24), rect(28, 106, 184, 10)];
const SIX_WHEEL = [circle(56, 152, 13), circle(120, 152, 13), circle(184, 152, 13)];
const SWERVE = [circle(52, 152, 13), circle(188, 152, 13), rect(38, 96, 28, 10), rect(174, 96, 28, 10)];

const PARTS: Record<GlyphKind, string[]> = {
  kitbot: [
    rect(64, 78, 84, 28),
    "M160 106V84H196V106",
    line(96, 78, 96, 34),
    "M96 34q0 -12 12 -12t12 12",
  ],
  elevator: [
    rect(92, 18, 8, 88),
    rect(140, 18, 8, 88),
    rect(84, 52, 72, 18),
    "M156 56h26M156 66h26M182 56l10 -8M182 66l10 8",
  ],
  arm: [rect(100, 54, 16, 52), circle(108, 54, 7), "M108 47L190 18L195 30L112 61Z", circle(196, 22, 10)],
  shooter: [
    "M44 106L36 62H112L104 106Z",
    rect(124, 82, 68, 24),
    circle(158, 64, 18),
    "M140 64a18 18 0 0 1 32 -12L206 30",
    line(176, 64, 210, 42),
  ],
  swerve: [
    rect(56, 90, 128, 16),
    line(120, 90, 120, 56),
    rect(108, 46, 24, 10),
    "M212 116V98q0 -8 8 -8h6",
    circle(224, 126, 8),
  ],
};

function pathsFor(kind: GlyphKind): string[] {
  return [GROUND, ...CHASSIS, ...(kind === "swerve" ? SWERVE : SIX_WHEEL), ...PARTS[kind]];
}

const DRAW: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: EASE_OUT, delay: i * 0.05 },
      opacity: { duration: 0.01, delay: i * 0.05 },
    },
  }),
};

type RobotGlyphProps = {
  kind: GlyphKind;
  className?: string;
  strokeWidth?: number;
  /** Solid silhouette instead of linework. For the locked robot. */
  filled?: boolean;
  /** Draw the lines on the first time it scrolls into view. */
  draw?: boolean;
  /** Draw on command instead of on scroll — for things above the fold. */
  play?: boolean;
};

export function RobotGlyph({
  kind,
  className = "",
  strokeWidth = 1.5,
  filled = false,
  draw = false,
  play,
}: RobotGlyphProps) {
  const maskId = `glyph-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const paths = pathsFor(kind);

  if (filled) {
    return (
      <svg viewBox="0 0 240 180" className={className} fill="currentColor" aria-hidden>
        <path d={paths.slice(1).join(" ")} />
      </svg>
    );
  }

  const svgProps = {
    viewBox: "0 0 240 180",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  // Hairlines stay hairlines at any size.
  const lines = paths.map((d, i) => <path key={i} d={d} vectorEffect="non-scaling-stroke" />);

  if (!draw && play === undefined) return <svg {...svgProps}>{lines}</svg>;

  // pathLength can't animate a non-scaling stroke — Chrome measures the dashes
  // in screen space and the drawing stops partway. So the visible lines stay
  // static and a thick mask of the same paths draws on over them.
  const body = (
    <>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="180">
          {paths.map((d, i) => (
            <motion.path key={i} d={d} custom={i} variants={DRAW} stroke="#fff" strokeWidth={7} fill="none" />
          ))}
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>{lines}</g>
    </>
  );

  if (play !== undefined) {
    return (
      <motion.svg {...svgProps} initial="hidden" animate={play ? "show" : "hidden"}>
        {body}
      </motion.svg>
    );
  }

  return (
    <motion.svg {...svgProps} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {body}
    </motion.svg>
  );
}
