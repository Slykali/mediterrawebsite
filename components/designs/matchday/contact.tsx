"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, type ReactNode } from "react";

import { submitContact } from "@/app/actions";
import { Cased, useContent, useLocale } from "@/components/i18n/locale-provider";
import { ClosedNotice } from "@/components/shared/closed-notice";
import { FormGuards } from "@/components/shared/form-guards";
import { Reveal } from "@/components/shared/reveal";
import { initialContactState, isChecked } from "@/lib/contact";
import { localePath } from "@/lib/i18n";
import { PAGE_PATHS } from "@/lib/pages";
import { useCopy } from "./copy";
import { HUD, MONO, SectionTitle } from "./ui";

const INPUT = "mt-2 w-full bg-transparent text-xl font-semibold outline-none placeholder:text-mute/80";

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block border border-rule bg-panel p-4 transition-colors focus-within:border-accent focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent ${className}`}>
      <span className={`flex justify-between gap-4 text-mute ${MONO}`}>
        <span>{label}</span>
        {error && <span className="tracking-normal text-accent-text normal-case">{error}</span>}
      </span>
      {children}
    </label>
  );
}

/** Team registration console. Roles alternate red and blue like alliance stations. */
export function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const form = useRef<HTMLFormElement>(null);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const c = useContent();
  const locale = useLocale();
  const t = useCopy();

  // After a failed submit, take the cursor to the first field that needs fixing.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    // The role picker comes first on the page, so it wins when it's one of them.
    const first = state.errors.interest ? 'input[name="interest"]' : '[aria-invalid="true"]';
    form.current?.querySelector<HTMLElement>(first)?.focus();
  }, [state]);

  return (
    <section id="contact" className="border-t border-rule px-4 py-20 sm:px-6">
      <SectionTitle kicker={t.registration}>
        {t.joinThe[0]}
        <br />
        {t.joinThe[1]}
      </SectionTitle>

      <Reveal delay={0.05}>
        <form ref={form} action={formAction} noValidate className="relative mt-10 grid gap-3 lg:grid-cols-12">
          <FormGuards />
          <ClosedNotice className="bg-panel lg:col-span-12" />

          <fieldset className="lg:col-span-12">
            <legend className={`flex w-full justify-between gap-4 text-mute ${MONO}`}>
              <span>{t.selectRole}</span>
              {errors.interest && <span className="tracking-normal text-accent-text normal-case">{errors.interest}</span>}
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
              {c.interests.map((option, i) => {
                const blue = i % 2 === 1;
                return (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="interest"
                      value={option.value}
                      defaultChecked={isChecked(state, option.value)}
                      className="peer sr-only"
                    />
                    <span
                      className={`flex h-full flex-col gap-3 border border-rule bg-panel p-4 transition-colors hover:border-mute peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                        blue
                          ? "peer-checked:border-accent-2 peer-checked:bg-accent-2/15"
                          : "peer-checked:border-accent peer-checked:bg-accent/15"
                      }`}
                    >
                      <span className={`${MONO} ${blue ? "text-accent-2-text" : "text-accent-text"}`}>
                        {blue ? t.blue : t.red} {Math.floor(i / 2) + 1}
                      </span>
                      <span className={`${HUD} text-2xl leading-none`}>
                        <Cased>{option.label}</Cased>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Field label={t.name} error={errors.name} className="lg:col-span-6">
            <input
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              aria-invalid={errors.name ? true : undefined}
              placeholder={t.namePlaceholder}
              className={INPUT}
            />
          </Field>
          <Field label={t.email} error={errors.email} className="lg:col-span-6">
            <input
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              placeholder={t.emailPlaceholder}
              className={INPUT}
            />
          </Field>
          <Field label={t.message} error={errors.message} className="lg:col-span-12">
            <textarea
              name="message"
              rows={5}
              defaultValue={values.message}
              aria-invalid={errors.message ? true : undefined}
              placeholder={t.messagePlaceholder}
              className={`${INPUT} resize-y`}
            />
          </Field>

          <p className="text-sm leading-relaxed text-mute lg:col-span-12">
            {t.privacyNote}{" "}
            <Link href={localePath(locale, PAGE_PATHS.privacy)} className="text-ink underline underline-offset-4">
              {t.privacyLink}
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 lg:col-span-12">
            <p role="status" className={`text-base ${state.status === "error" ? "text-accent-text" : "text-ink"}`}>
              {state.message}
            </p>
            <button
              type="submit"
              disabled={pending}
              className="group -skew-x-12 bg-accent px-8 py-4 text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <span className={`inline-block skew-x-12 text-2xl ${HUD}`}>
                {pending ? t.lockingIn : t.lockIn}
              </span>
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
