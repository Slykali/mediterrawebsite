/**
 * Wrap a value into [min, max), looping past either end. The marquee rides on
 * this: translate the track by exactly one copy's width and wrap, and the loop
 * has no seam.
 *
 * Written out rather than pulled from a dependency — it's four lines and the
 * marquee shouldn't care which animation library ships which helper.
 */
export function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

const SM_FILL = ["sm:col-span-2", "sm:col-span-1"] as const;
const LG_FILL = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"] as const;

/**
 * Span for the last item of a 2-column (sm) / 3-column (lg) grid so it fills
 * out its row instead of leaving an empty cell, given how many items precede
 * it. Keeps the garages tidy however many robots are listed.
 */
export function fillLastRow(itemsBefore: number): string {
  return `${SM_FILL[itemsBefore % 2]} ${LG_FILL[itemsBefore % 3]}`;
}
