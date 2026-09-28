export const CONTAINER = "mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12";
export const KICKER = "font-mono text-[10px] tracking-[0.2em] uppercase";
export const H2 = "font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.01em]";
export const DROP_CAP =
  "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:not-italic first-letter:text-accent";

/** "MEDITERRA" → "Mediterra", for the masthead. */
export function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
