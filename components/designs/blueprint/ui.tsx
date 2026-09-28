import type { ReactNode } from "react";

import { TIMELINE, type TimelineKind } from "@/lib/content";

export const MONO = "font-mono text-[10px] tracking-[0.16em] uppercase";
export const PAD = "px-6 sm:px-12";
export const REV = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/** The revision the sheet is currently at: one letter per timeline entry. */
export const CURRENT_REV = REV[TIMELINE.length - 1];

export const STATUS: Record<TimelineKind, { label: string; tone: string }> = {
  legacy: { label: "Released", tone: "border-ink/50 text-ink" },
  latest: { label: "Latest", tone: "border-accent text-accent" },
  next: { label: "In work", tone: "border-accent-2 text-accent-2" },
};

/**
 * The drawing sheet's border, fixed to the viewport: an outer line, an inner
 * line, and zone references (1–6 across, A–D down) like a real sheet.
 */
export function SheetFrame() {
  const columns = ["1", "2", "3", "4", "5", "6"];
  const rows = ["A", "B", "C", "D"];
  const zone = "flex items-center justify-center font-mono text-[9px] text-ink/55";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-2 z-40 border border-ink/45 sm:inset-3">
      <div className="absolute inset-0 border-ink/20 sm:inset-5 sm:border" />
      <div className="absolute inset-x-5 top-0 hidden h-5 grid-cols-6 sm:grid">
        {columns.map((n) => (
          <span key={n} className={`${zone} border-r border-ink/20 last:border-r-0`}>
            {n}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-5 bottom-0 hidden h-5 grid-cols-6 sm:grid">
        {columns.map((n) => (
          <span key={n} className={`${zone} border-r border-ink/20 last:border-r-0`}>
            {n}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-5 left-0 hidden w-5 grid-rows-4 sm:grid">
        {rows.map((r) => (
          <span key={r} className={`${zone} border-b border-ink/20 last:border-b-0`}>
            {r}
          </span>
        ))}
      </div>
      <div className="absolute inset-y-5 right-0 hidden w-5 grid-rows-4 sm:grid">
        {rows.map((r) => (
          <span key={r} className={`${zone} border-b border-ink/20 last:border-b-0`}>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Sheet title bar that opens each section. */
export function SheetHeader({ sheet, title, note }: { sheet: string; title: string; note: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/40 pb-5">
      <div>
        <p className={`text-mute ${MONO}`}>Sheet {sheet} / 05</p>
        <h2 className="mt-2 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-semibold tracking-[-0.01em] uppercase">
          {title}
        </h2>
      </div>
      <p className="max-w-sm font-mono text-[11px] leading-relaxed text-mute">{note}</p>
    </div>
  );
}

/** Revision triangle, as used in a drawing's revision block. */
export function RevMark({ letter, active = false }: { letter: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 30 26" className={`h-7 w-8 ${active ? "text-accent" : "text-ink"}`} aria-hidden>
      <path d="M15 2L28 24H2Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <text x="15" y="20" textAnchor="middle" fontSize="11" fill="currentColor" className="font-mono">
        {letter}
      </text>
    </svg>
  );
}

/** Registration marks in the corners of a detail box. */
export function Corners() {
  const mark = "absolute size-3 border-ink";
  return (
    <>
      <span aria-hidden className={`${mark} -top-px -left-px border-t-2 border-l-2`} />
      <span aria-hidden className={`${mark} -top-px -right-px border-t-2 border-r-2`} />
      <span aria-hidden className={`${mark} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden className={`${mark} -right-px -bottom-px border-r-2 border-b-2`} />
    </>
  );
}
