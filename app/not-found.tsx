import { headers } from "next/headers";
import Link from "next/link";

import { DEFAULT_LOCALE, LOCALE_HEADER, isLocale, localePath } from "@/lib/i18n";
import { CHROME, PAGES, PAGE_PATHS, type PageKey } from "@/lib/pages";

const LINKS: PageKey[] = ["home", "history", "sponsors", "join"];

export default async function NotFound() {
  const requested = (await headers()).get(LOCALE_HEADER);
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;
  const t = CHROME[locale].notFound;

  return (
    <main id="main" className="flex min-h-screen flex-col items-start justify-end gap-6 bg-canvas p-6 text-ink sm:p-10">
      <p className="font-mono text-[0.625rem] tracking-[0.2em] text-mute uppercase">{t.kicker}</p>
      <h1 className="display-title text-[clamp(4rem,16vw,14rem)] leading-[0.85]">
        {t.line1}
        <br />
        {t.line2}
      </h1>
      <p className="max-w-md text-sm text-mute">{t.body}</p>
      <nav className="flex flex-wrap gap-3">
        {LINKS.map((page, i) => (
          <Link
            key={page}
            href={localePath(locale, PAGE_PATHS[page])}
            className={`border px-5 py-3 font-mono text-xs tracking-[0.16em] uppercase transition-colors hover:bg-accent hover:text-on-accent ${
              i === 0 ? "border-ink" : "border-rule"
            }`}
          >
            {PAGES[locale][page].label} &rarr;
          </Link>
        ))}
      </nav>
    </main>
  );
}
