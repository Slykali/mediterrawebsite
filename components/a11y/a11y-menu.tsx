"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { A11Y_COPY, type A11yToggle } from "@/lib/a11y";
import { localePath } from "@/lib/i18n";
import { PAGE_PATHS } from "@/lib/pages";
import { useA11y } from "./a11y-provider";

const TOGGLES: A11yToggle[] = ["contrast", "still", "links", "readable"];
const LABEL = "font-mono text-[0.625rem] tracking-[0.18em] uppercase";

/** The usual accessibility figure: a person with arms out, in a circle. */
function Figure() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="12" r="10.2" />
      <circle cx="12" cy="6.6" r="1.4" fill="currentColor" stroke="none" />
      <path d="M6.5 9.4 12 10.6l5.5-1.2M12 10.6v3.6m0 0-2.4 4.6m2.4-4.6 2.4 4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Bottom-left button and the panel it opens. Not a modal: the page stays
 * usable, Escape or a click outside closes it, and focus goes back to the
 * button. Every control is a real button with its state exposed
 * (aria-pressed / role="switch"), so it works with a keyboard and a screen
 * reader, not just a mouse.
 */
export function A11yMenu() {
  const locale = useLocale();
  const t = A11Y_COPY[locale];
  const { settings, update, reset } = useA11y();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("button")?.focus();

    const close = (returnFocus: boolean) => {
      setOpen(false);
      if (returnFocus) button.current?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target)) close(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 left-4 z-[90] font-body text-ink">
      {open && (
        <div
          ref={panel}
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          className="absolute bottom-14 left-0 w-[min(20rem,calc(100vw-2rem))] border border-rule bg-panel p-4 shadow-2xl shadow-black/60"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 id={titleId} className="display-title text-2xl leading-none">
              {t.title}
            </h2>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
              className={`px-1 py-1 text-mute transition-colors hover:text-ink ${LABEL}`}
            >
              {t.close} ✕
            </button>
          </div>

          <fieldset className="mt-4">
            <legend className={`text-mute ${LABEL}`}>{t.textSize}</legend>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {t.sizes.map((label, i) => {
                const active = settings.text === i;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ text: i as 0 | 1 | 2 })}
                    className={`flex flex-col items-center gap-1 border px-2 py-2 transition-colors ${
                      active ? "border-accent bg-accent/15" : "border-rule hover:border-mute"
                    }`}
                  >
                    <span aria-hidden className="font-display leading-none font-extrabold" style={{ fontSize: `${1 + i * 0.3}rem` }}>
                      A
                    </span>
                    <span className="text-xs">{label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {TOGGLES.map((key) => {
              const on = settings[key];
              return (
                <li key={key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    onClick={() => update({ [key]: !on })}
                    className="flex w-full items-center justify-between gap-4 py-2.5 text-left text-base"
                  >
                    {t.toggles[key]}
                    <span
                      aria-hidden
                      className={`relative h-5 w-9 shrink-0 border transition-colors ${on ? "border-accent bg-accent" : "border-mute"}`}
                    >
                      <span
                        className={`absolute top-0.5 size-3.5 transition-[left] ${on ? "left-[1.1rem] bg-on-accent" : "left-0.5 bg-mute"}`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between gap-4">
            <button type="button" onClick={reset} className={`text-mute transition-colors hover:text-ink ${LABEL}`}>
              {t.reset}
            </button>
            <Link
              href={localePath(locale, PAGE_PATHS.accessibility)}
              onClick={() => setOpen(false)}
              className="text-sm text-ink underline underline-offset-4"
            >
              {t.statement}
            </Link>
          </div>
          <p className="mt-3 text-xs text-mute">{t.saved}</p>
        </div>
      )}

      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={t.open}
        title={t.open}
        onClick={() => setOpen((value) => !value)}
        className={`flex size-11 items-center justify-center border transition-colors ${
          open ? "border-accent-2 bg-accent-2 text-on-accent" : "border-rule bg-panel/90 text-ink backdrop-blur-sm hover:border-mute"
        }`}
      >
        <Figure />
      </button>
    </div>
  );
}
