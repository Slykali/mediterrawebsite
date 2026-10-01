import Link from "next/link";
import type { ReactNode } from "react";

import { DESIGNS } from "@/components/designs/registry";
import { LangSwitch } from "@/components/i18n/lang-switch";
import { JsonLd } from "@/components/shared/json-ld";
import type { DesignId } from "@/lib/designs";
import { cased } from "@/lib/cased";
import { localePath, type Locale } from "@/lib/i18n";
import { CHROME, NAV_PAGES, PAGES, PAGE_PATHS, type PageKey } from "@/lib/pages";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { DesignFrame } from "./design-frame";

const LABEL = "font-mono text-[10px] tracking-[0.18em] uppercase";

/**
 * Frame for every page except home: a header with the page nav and EN / TR,
 * a title block with the page's one <h1>, then the page body and the active
 * design's own footer. Everything is drawn with the shared tokens, so it takes
 * on whichever design is active.
 */
export function PageShell({
  locale,
  page,
  design,
  children,
}: {
  locale: Locale;
  page: Exclude<PageKey, "home">;
  design: DesignId;
  children: ReactNode;
}) {
  const parts = DESIGNS[design];
  const pages = PAGES[locale];
  const copy = pages[page];
  const home = localePath(locale, "/");
  const { Frame, Footer } = parts;

  return (
    <DesignFrame id={design}>
      <JsonLd data={breadcrumbJsonLd(locale, page)} />
      <div className={parts.frameClassName}>
        {Frame && <Frame />}

        <header
          id="top"
          className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule py-3 text-mute ${parts.pad} ${LABEL}`}
        >
          <Link href={home} className="flex items-center gap-2 text-ink">
            <span className="size-1.5 bg-accent" />
            FRC {site.team.number} &middot; {cased(site.team.name, locale)}
          </Link>
          <nav aria-label={CHROME[locale].pagesNav}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {NAV_PAGES.map((key) => (
                <li key={key}>
                  <Link
                    href={localePath(locale, PAGE_PATHS[key])}
                    aria-current={key === page ? "page" : undefined}
                    className={`transition-colors hover:text-ink ${key === page ? "text-ink" : ""}`}
                  >
                    {pages[key].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LangSwitch className="text-ink" />
        </header>

        <main id="main">
          <div className={`border-b border-rule py-14 sm:py-20 ${parts.pad}`}>
            <nav aria-label={CHROME[locale].breadcrumb} className={`text-mute ${LABEL}`}>
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href={home} className="transition-colors hover:text-ink">
                    {pages.home.label}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {copy.label}
                </li>
              </ol>
            </nav>
            <p className={`mt-10 text-accent-text ${LABEL}`}>{copy.kicker}</p>
            {/* Leading leaves room for İ, Ö, Ü dots above and Ç, Ş tails below. */}
            <h1 className="display-title mt-5 text-[clamp(3rem,10vw,8rem)] leading-[0.95]">{copy.h1}</h1>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mute sm:text-base">{copy.intro}</p>
          </div>

          {children}
        </main>

        <Footer />
      </div>
    </DesignFrame>
  );
}
