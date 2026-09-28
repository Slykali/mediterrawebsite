import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-end gap-6 bg-canvas p-6 text-ink sm:p-10">
      <p className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">Error 404</p>
      <h1 className="font-display text-[clamp(4rem,16vw,14rem)] leading-[0.85] uppercase">
        Not on
        <br />
        the field
      </h1>
      <Link
        href="/"
        className="border border-rule px-5 py-3 font-mono text-xs tracking-[0.16em] uppercase transition-colors hover:bg-accent hover:text-on-accent"
      >
        Back to the home page &rarr;
      </Link>
    </main>
  );
}
