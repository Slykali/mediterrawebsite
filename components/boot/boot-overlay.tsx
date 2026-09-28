"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { useBoot } from "./boot-provider";

export type BootExit = "collapse" | "lift" | "wipe" | "fade";

const EXITS = {
  // Shrinks to a horizontal line and goes, like a tape cut.
  collapse: {
    from: { clipPath: "inset(0% 0% 0% 0%)" },
    to: { clipPath: "inset(50% 0% 50% 0%)", transition: { duration: 0.5, ease: EASE_IN_OUT } },
  },
  // Slides up like a sheet of paper.
  lift: {
    from: { y: "0%" },
    to: { y: "-100%", transition: { duration: 0.75, ease: EASE_IN_OUT } },
  },
  // Clears left to right.
  wipe: {
    from: { clipPath: "inset(0% 0% 0% 0%)" },
    to: { clipPath: "inset(0% 0% 0% 100%)", transition: { duration: 0.6, ease: EASE_IN_OUT } },
  },
  fade: {
    from: { opacity: 1 },
    to: { opacity: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  },
};

/**
 * Shell for every design's intro: owns the scroll lock, skip-on-input and the
 * exit. The design supplies what's on screen.
 */
export function BootOverlay({ children, exit = "collapse" }: { children: ReactNode; exit?: BootExit }) {
  const { phase, finish } = useBoot();
  const active = phase === "idle" || phase === "running";

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";

    // Any input skips. Nobody should be held hostage by an intro.
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [active, finish]);

  // Never played — tear the whole tree down so there's no curtain call for
  // someone who never saw the curtain.
  if (phase === "skipped") return null;

  const { from, to } = EXITS[exit];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="boot"
          data-boot-overlay
          // Decorative. Screen readers skip it and read the real page, which is
          // already in the DOM underneath.
          aria-hidden
          initial={from}
          animate={from}
          exit={to}
          className="fixed inset-0 z-[100] bg-canvas"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
