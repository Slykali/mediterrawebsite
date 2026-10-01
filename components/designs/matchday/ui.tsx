import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";

/** Condensed, heavy, italic display type. */
export const HUD = "font-display font-extrabold uppercase italic tracking-[-0.01em]";
export const MONO = "font-mono text-[0.625rem] tracking-[0.2em] uppercase";

/** Field-connected green, as on the driver station. */
export const GO = "#2bd46a";

export function SectionTitle({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <Reveal>
      <p className={`flex items-center gap-2 text-mute ${MONO}`}>
        <span className="h-3 w-1 bg-accent" />
        <span className="h-3 w-1 bg-accent-2" />
        {kicker}
      </p>
      {/* Large text settings can make one long word wider than a phone; let it break. */}
      <h2 className={`${HUD} mt-3 text-[clamp(3rem,8vw,7rem)] leading-[0.85] break-words hyphens-auto`}>{children}</h2>
    </Reveal>
  );
}

/** Parallelogram (skewed) link button. */
export function SkewButton({
  href,
  tone,
  children,
}: {
  href: string;
  tone: "red" | "blue";
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex -skew-x-12 items-center px-7 py-3 text-on-accent transition-transform hover:-translate-y-0.5 ${
        tone === "red" ? "bg-accent" : "bg-accent-2"
      }`}
    >
      <span className={`skew-x-12 ${HUD} text-xl`}>
        {children}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
      </span>
    </a>
  );
}
