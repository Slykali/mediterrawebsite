"use client";

import { useLocale } from "@/components/i18n/locale-provider";
import { FAQ, FAQ_HEADING } from "@/lib/faq";
import { Reveal } from "./reveal";

/**
 * Homepage FAQ. Same text as the FAQPage structured data (both come from
 * lib/faq.ts). Built on the shared tokens so it takes on whichever design is
 * active; `className` lets a design adjust padding and borders.
 */
export function Faq({ className = "border-t border-rule px-4 py-16 sm:px-6 sm:py-24" }: { className?: string }) {
  const locale = useLocale();
  const heading = FAQ_HEADING[locale];

  return (
    <section id="faq" aria-labelledby="faq-title" className={className}>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-mute uppercase">{heading.kicker}</p>
          <h2 id="faq-title" className="display-title mt-3 text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">
            {heading.title}
          </h2>
        </Reveal>
        <div className="divide-y divide-rule border-y border-rule lg:col-span-8">
          {FAQ[locale].map((item) => (
            <Reveal key={item.question} className="py-6 sm:py-8">
              {/* Sentence case: whole questions in capitals are hard to read, and
                  Turkish capitals would respell names (Competition → COMPETİTİON). */}
              <h3 className="display-face text-2xl leading-tight sm:text-3xl">{item.question}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute sm:text-base">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
