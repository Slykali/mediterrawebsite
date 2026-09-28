"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * idle    — first paint, before the client has decided anything. The overlay is
 *           already on screen (server-rendered), so there's no flash of hero.
 * running — the sequence is playing.
 * done    — it played and finished, or was skipped mid-run. Overlay exits.
 * skipped — it never played (repeat visit, or reduced motion). Overlay is
 *           removed with no animation at all.
 *
 * The provider only holds state. Scroll lock and skip-on-input belong to the
 * overlay, so a page without one (the 404) never gets stuck locked.
 */
export type BootPhase = "idle" | "running" | "done" | "skipped";

export const BOOT_STORAGE_KEY = "frc6874:booted";

type BootContextValue = {
  phase: BootPhase;
  /** The page is live: boot finished, or was never played. */
  booted: boolean;
  /** End the sequence now. Safe to call more than once. */
  finish: () => void;
};

const BootContext = createContext<BootContextValue | null>(null);

export function useBoot(): BootContextValue {
  const ctx = useContext(BootContext);
  if (!ctx) throw new Error("useBoot() must be called inside <BootProvider>");
  return ctx;
}

/** sessionStorage throws in some privacy modes. It's a nicety, not a feature. */
function readSessionFlag(): boolean {
  try {
    return window.sessionStorage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSessionFlag(): void {
  try {
    window.sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    /* no-op */
  }
}

export function BootProvider({ children }: { children: ReactNode }) {
  // Starts "idle" so server HTML and first client render match.
  const [phase, setPhase] = useState<BootPhase>("idle");

  useEffect(() => {
    const seen = readSessionFlag();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Once per tab, never for people who asked for less motion. Functional
    // update so an input that already skipped from "idle" isn't overwritten.
    setPhase((prev) => (prev === "idle" ? (seen || reduced ? "skipped" : "running") : prev));
  }, []);

  const finish = useCallback(() => {
    setPhase((prev) => (prev === "running" || prev === "idle" ? "done" : prev));
    writeSessionFlag();
  }, []);

  const value = useMemo<BootContextValue>(
    () => ({ phase, booted: phase === "done" || phase === "skipped", finish }),
    [phase, finish],
  );

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}
