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

import { BOOT_COOKIE } from "@/lib/boot";

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
  /**
   * The server already knew the intro wouldn't play, so the hero should render
   * in its final state (initial={false}) instead of animating in.
   */
  instant: boolean;
  /**
   * A crawler. Scroll reveals render in their final state too, so every word
   * is visible in the server HTML without running any script.
   */
  crawler: boolean;
  /** End the sequence now. Safe to call more than once. */
  finish: () => void;
};

const BootContext = createContext<BootContextValue | null>(null);

export function useBoot(): BootContextValue {
  const ctx = useContext(BootContext);
  if (!ctx) throw new Error("useBoot() must be called inside <BootProvider>");
  return ctx;
}

/** sessionStorage throws in some privacy modes, so failures are ignored. */
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
  document.cookie = `${BOOT_COOKIE}=1; path=/; samesite=lax`;
}

/** Forget the intro was seen, so the next load plays it again. */
export function clearBootFlag(): void {
  try {
    window.sessionStorage.removeItem(BOOT_STORAGE_KEY);
  } catch {
    /* no-op */
  }
  document.cookie = `${BOOT_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function BootProvider({
  children,
  skip = false,
  crawler = false,
}: {
  children: ReactNode;
  /** Decided on the server: crawler, or the boot cookie is set. */
  skip?: boolean;
  crawler?: boolean;
}) {
  // Starts "idle" (or "skipped" when the server already knows) so server HTML
  // and first client render match.
  const [phase, setPhase] = useState<BootPhase>(skip ? "skipped" : "idle");

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
    () => ({ phase, booted: phase === "done" || phase === "skipped", instant: skip, crawler, finish }),
    [phase, skip, crawler, finish],
  );

  return <BootContext.Provider value={value}>{children}</BootContext.Provider>;
}
