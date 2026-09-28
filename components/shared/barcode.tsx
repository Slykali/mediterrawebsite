/**
 * Decorative barcode derived from a string. Deterministic, so the server and
 * client draw the same bars. It doesn't scan and isn't meant to.
 */
export function Barcode({ value, className = "" }: { value: string; className?: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;

  for (const ch of value) {
    const code = ch.charCodeAt(0);
    for (let bit = 0; bit < 7; bit++) {
      const w = (code >> bit) & 1 ? 2 : 1;
      if ((bit + code) % 2 === 0) bars.push({ x, w });
      x += w + 1;
    }
  }

  return (
    <svg viewBox={`0 0 ${x} 20`} preserveAspectRatio="none" className={className} aria-hidden>
      {bars.map((bar, i) => (
        <rect key={i} x={bar.x} y={0} width={bar.w} height={20} fill="currentColor" />
      ))}
    </svg>
  );
}
