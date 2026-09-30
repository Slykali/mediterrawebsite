"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

import { clearBootFlag } from "@/components/boot/boot-provider";
import { SECTION_IDS } from "@/lib/content";
import { DESIGN_COOKIE, DESIGN_IDS, DESIGN_META, type DesignId } from "@/lib/designs";

/** The section whose top has crossed the upper third of the viewport. */
function currentSection(): string | null {
  let current: string | null = null;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
  }
  return current === "top" ? null : current;
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

/**
 * Picker for comparing designs; looks the same in all five. Switching keeps
 * the current section in view. Keys 1–5 jump straight to a design.
 */
export function DesignSwitcher({ current }: { current: DesignId }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [target, setTarget] = useState<DesignId | null>(null);

  const index = DESIGN_IDS.indexOf(current);

  const go = useCallback(
    (id: DesignId) => {
      if (id === current) return;
      const section = currentSection();
      document.cookie = `${DESIGN_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.dataset.design = id;
      setTarget(id);
      startTransition(() => {
        // Same page, new design. The canonical stays the clean URL either way.
        router.replace(`${pathname}?design=${id}${section ? `#${section}` : ""}`);
      });
    },
    [current, pathname, router],
  );

  const step = useCallback(
    (delta: number) => go(DESIGN_IDS[(index + delta + DESIGN_IDS.length) % DESIGN_IDS.length]),
    [go, index],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
      if (event.key === "Escape") setOpen(false);
      const n = Number(event.key);
      if (Number.isInteger(n) && n >= 1 && n <= DESIGN_IDS.length) go(DESIGN_IDS[n - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const replayIntro = () => {
    clearBootFlag();
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const meta = DESIGN_META[current];

  return (
    <div className="fixed right-3 bottom-3 z-[90] font-mono text-[11px] text-[#f2f2f2] [font-variant-numeric:tabular-nums]">
      {open && (
        <div
          id="design-panel"
          className="mb-2 w-[min(23rem,calc(100vw-1.5rem))] border border-white/15 bg-[#0e0e0e]/95 shadow-2xl backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[10px] tracking-[0.16em] text-white/55 uppercase">
            <span>Pick a design</span>
            <span>Keys 1–{DESIGN_IDS.length}</span>
          </div>

          <ul>
            {DESIGN_IDS.map((id, i) => {
              const item = DESIGN_META[id];
              const active = id === current;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    aria-current={active || undefined}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.06] ${
                      active ? "bg-white/[0.08]" : ""
                    }`}
                  >
                    <span className="w-3 text-white/40">{i + 1}</span>
                    <span className="flex shrink-0 border border-white/15">
                      {item.swatches.map((color) => (
                        <span key={color} className="h-5 w-3" style={{ backgroundColor: color }} />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block tracking-[0.12em] uppercase">{item.name}</span>
                      <span className="block truncate text-white/50">{item.blurb}</span>
                    </span>
                    <span className="w-3 text-right text-white/70">
                      {pending && target === id ? "…" : active ? "●" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-[10px] tracking-[0.14em] text-white/55 uppercase">
            <button type="button" onClick={replayIntro} className="transition-colors hover:text-white">
              Replay intro ↺
            </button>
            <span>Lock it in: lib/designs.ts</span>
          </div>
        </div>
      )}

      <div className="flex items-stretch border border-white/15 bg-[#0e0e0e]/95 backdrop-blur">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous design"
          className="px-2.5 transition-colors hover:bg-white/[0.08]"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="design-panel"
          className="flex items-center gap-2 border-x border-white/10 px-3 py-2 tracking-[0.14em] uppercase transition-colors hover:bg-white/[0.08]"
        >
          <span className="text-white/50">
            {String(index + 1).padStart(2, "0")}/{String(DESIGN_IDS.length).padStart(2, "0")}
          </span>
          <span>{pending ? "Loading…" : meta.name}</span>
          <span className="text-white/50">{open ? "▾" : "▴"}</span>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next design"
          className="px-2.5 transition-colors hover:bg-white/[0.08]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
