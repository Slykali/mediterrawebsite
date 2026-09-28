import { useEffect, useState } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

/**
 * Ticks once a second. Returns null until mounted: the server's clock and the
 * visitor's never agree, and rendering either one would be a hydration mismatch.
 */
export function useCountdown(targetISO: string): Countdown | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return null;

  const diff = Math.max(0, new Date(targetISO).getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  };
}

export const pad2 = (n: number | undefined) => (n === undefined ? "--" : String(n).padStart(2, "0"));
