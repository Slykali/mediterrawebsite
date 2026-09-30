"use client";

import { useActionState, type InputHTMLAttributes } from "react";

import { submitContact } from "@/app/actions";
import { FormGuards } from "@/components/shared/form-guards";
import { Reveal } from "@/components/shared/reveal";
import { INTEREST_VALUES, initialContactState } from "@/lib/contact";
import { useCopy } from "./copy";
import { H2, KICKER } from "./ui";

const LINE_HEIGHT = "2.3em";

function Blank({ error, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      aria-invalid={error ? true : undefined}
      className={`mx-1 inline-block max-w-full border-b bg-transparent px-1 text-center italic outline-none placeholder:text-mute/70 focus:border-accent ${
        error ? "border-accent" : "border-ink"
      } ${className}`}
    />
  );
}

/** The form is the letter: fill in the blanks. */
export function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const problems = Object.values(errors).filter(Boolean);
  // Each option finishes the sentence "I'd like to …" / "… istiyorum."
  const t = useCopy();

  return (
    <section id="contact" className="border-t border-ink bg-panel/40">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal className="text-center">
          <p className={`text-accent ${KICKER}`}>{t.letters}</p>
          <h2 className={`mt-3 ${H2}`}>
            {t.writeTo[0]}
            <em>{t.writeTo[1]}</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-mute italic">{t.lettersNote}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            action={formAction}
            noValidate
            className="relative mt-12 border border-ink bg-canvas p-6 text-xl sm:p-10 sm:text-2xl"
            style={{ lineHeight: LINE_HEIGHT }}
          >
            <FormGuards design="editorial" />

            <p>{t.dear}</p>
            <p className="mt-2">
              {t.myNameIs}
              <Blank
                name="name"
                autoComplete="name"
                placeholder={t.namePlaceholder}
                aria-label={t.nameLabel}
                defaultValue={values.name}
                error={errors.name}
                className="w-[11ch]"
              />
              {t.writeBackAt}
              <Blank
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                aria-label={t.emailLabel}
                defaultValue={values.email}
                error={errors.email}
                className="w-[15ch]"
              />
              {t.afterEmail}
            </p>
            <p>
              {t.likeBefore}
              <span className="relative inline-block">
                <select
                  name="interest"
                  aria-label={t.interestLabel}
                  defaultValue={values.interest ?? "crew"}
                  // field-sizing hugs the chosen option where supported; elsewhere it's the widest one.
                  className="appearance-none border-b border-ink bg-transparent pr-6 pl-1 text-accent italic outline-none [field-sizing:content] focus:border-accent"
                >
                  {INTEREST_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {t.phrase[value]}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-1 bottom-0 text-sm text-accent">
                  &#9662;
                </span>
              </span>
              {t.likeAfter}
            </p>

            <textarea
              name="message"
              rows={4}
              aria-label={t.messageLabel}
              aria-invalid={errors.message ? true : undefined}
              defaultValue={values.message}
              placeholder={t.messagePlaceholder}
              className="mt-4 block w-full resize-y bg-transparent italic outline-none placeholder:text-mute/70"
              style={{
                lineHeight: LINE_HEIGHT,
                backgroundImage: `linear-gradient(to bottom, transparent calc(${LINE_HEIGHT} - 1px), var(--rule) calc(${LINE_HEIGHT} - 1px))`,
                backgroundSize: `100% ${LINE_HEIGHT}`,
              }}
            />

            {(problems.length > 0 || state.message) && (
              <p
                role="status"
                className={`mt-6 text-lg leading-snug italic ${state.status === "error" ? "text-accent" : "text-ink"}`}
              >
                {problems.length > 0 ? problems.join(" ") : state.message}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 leading-normal">
              <span className="text-lg text-mute italic">{t.signed}</span>
              <button
                type="submit"
                disabled={pending}
                className="border border-ink px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-canvas disabled:opacity-60"
              >
                {pending ? t.posting : t.send}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
