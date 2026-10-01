/**
 * The accessibility menu's settings. They live in localStorage and show up as
 * data attributes on <html>, which app/globals.css reads. The script in
 * A11Y_HEAD_SCRIPT applies them before the first paint, so a visitor who
 * asked for large text never sees the page jump.
 */

import type { Locale } from "./i18n";

export type A11ySettings = {
  /** 0 default, 1 large, 2 larger. */
  text: 0 | 1 | 2;
  contrast: boolean;
  /** Stop animations: no intro, no ticker, no reveals. */
  still: boolean;
  links: boolean;
  readable: boolean;
};

export type A11yToggle = Exclude<keyof A11ySettings, "text">;

export const A11Y_DEFAULTS: A11ySettings = { text: 0, contrast: false, still: false, links: false, readable: false };

export const A11Y_STORAGE_KEY = "frc6874-a11y";

/** <html> attribute for each setting. */
export const A11Y_ATTR = {
  text: "data-a11y-text",
  contrast: "data-a11y-contrast",
  still: "data-a11y-still",
  links: "data-a11y-links",
  readable: "data-a11y-readable",
} as const satisfies Record<keyof A11ySettings, string>;

/** Inline in <head>. Plain ES5, no imports; storage can throw in private modes. */
export const A11Y_HEAD_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  A11Y_STORAGE_KEY,
)})||"{}"),d=document.documentElement,a=${JSON.stringify(A11Y_ATTR)};if(s.text===1||s.text===2)d.setAttribute(a.text,String(s.text));["contrast","still","links","readable"].forEach(function(k){if(s[k]===true)d.setAttribute(a[k],"")})}catch(e){}})();`;

export const A11Y_COPY: Record<
  Locale,
  {
    open: string;
    title: string;
    textSize: string;
    sizes: [string, string, string];
    toggles: Record<A11yToggle, string>;
    reset: string;
    saved: string;
    statement: string;
    close: string;
  }
> = {
  en: {
    open: "Accessibility settings",
    title: "Accessibility",
    textSize: "Text size",
    sizes: ["Default", "Large", "Larger"],
    toggles: {
      contrast: "Higher contrast",
      still: "Stop animations",
      links: "Underline links",
      readable: "Plainer font",
    },
    reset: "Reset",
    saved: "Saved in this browser only.",
    statement: "Accessibility statement",
    close: "Close",
  },
  tr: {
    open: "Erişilebilirlik ayarları",
    title: "Erişilebilirlik",
    textSize: "Yazı boyutu",
    sizes: ["Normal", "Büyük", "Daha büyük"],
    toggles: {
      contrast: "Yüksek kontrast",
      still: "Animasyonları durdur",
      links: "Bağlantıların altını çiz",
      readable: "Sade yazı tipi",
    },
    reset: "Sıfırla",
    saved: "Yalnızca bu tarayıcıda saklanır.",
    statement: "Erişilebilirlik beyanı",
    close: "Kapat",
  },
};
