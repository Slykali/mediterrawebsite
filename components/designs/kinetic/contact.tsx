"use client";

import { useActionState, type ReactNode } from "react";

import { submitContact } from "@/app/actions";
import { FormGuards } from "@/components/shared/form-guards";
import { Reveal } from "@/components/shared/reveal";
import { INTERESTS, initialContactState, isChecked } from "@/lib/contact";
import { site } from "@/lib/site";
import { H2, LABEL, Rail } from "./ui";

const INPUT = "mt-2 w-full bg-transparent text-sm text-ink outline-none placeholder:text-mute/60";

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
    <label className={`block border-b border-rule px-4 py-4 transition-colors focus-within:bg-panel sm:px-6 ${className}`}>
      <span className={`flex justify-between gap-4 text-mute ${LABEL}`}>
        <span>{label}</span>
        {error && <span className="tracking-normal text-accent normal-case">{error}</span>}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};
  const { contact } = site;

  return (
    <section id="contact">
      <Rail index="04" label="Contact" meta="Replies in a few days" />

      <div className="grid lg:grid-cols-12">
        <div className="border-rule px-4 py-14 sm:px-6 sm:py-20 lg:col-span-5 lg:border-r">
          <Reveal>
            <h2 className={H2}>
              Talk
              <br />
              to us
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-mute sm:text-sm">
              Students who want to join, companies that want to sponsor, engineers who could mentor:
              write to us and someone on the team will answer.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className={`mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 ${LABEL}`}>
              <dt className="text-mute">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="tracking-normal text-ink normal-case transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </dd>
              <dt className="text-mute">Instagram</dt>
              <dd>
                <a href={contact.instagram} target="_blank" rel="noreferrer" className="text-ink hover:text-accent">
                  @team_6874 &#8599;
                </a>
              </dd>
              <dt className="text-mute">X</dt>
              <dd>
                <a href={contact.x} target="_blank" rel="noreferrer" className="text-ink hover:text-accent">
                  @team6874 &#8599;
                </a>
              </dd>
              <dt className="text-mute">Results</dt>
              <dd>
                <a href={contact.tba} target="_blank" rel="noreferrer" className="text-ink hover:text-accent">
                  The Blue Alliance &#8599;
                </a>
              </dd>
            </dl>
          </Reveal>
        </div>

        <form action={formAction} noValidate className="relative border-t border-rule lg:col-span-7 lg:border-t-0">
          <FormGuards design="kinetic" />

          <div className="grid sm:grid-cols-2">
            <Field label="Name" error={errors.name} className="sm:border-r">
              <input
                name="name"
                autoComplete="name"
                defaultValue={values.name}
                aria-invalid={errors.name ? true : undefined}
                placeholder="Your name"
                className={INPUT}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={values.email}
                aria-invalid={errors.email ? true : undefined}
                placeholder="you@example.com"
                className={INPUT}
              />
            </Field>
          </div>

          <fieldset className="border-b border-rule px-4 py-4 sm:px-6">
            <legend className="sr-only">I want to</legend>
            <span aria-hidden className={`flex justify-between text-mute ${LABEL}`}>
              <span>I want to</span>
              {errors.interest && <span className="tracking-normal text-accent normal-case">{errors.interest}</span>}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESTS.map((option) => (
                <label key={option.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="interest"
                    value={option.value}
                    defaultChecked={isChecked(state, option.value)}
                    className="peer sr-only"
                  />
                  <span
                    className={`block border border-rule px-3 py-2 transition-colors hover:border-mute peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${LABEL}`}
                  >
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field label="Message" error={errors.message}>
            <textarea
              name="message"
              rows={6}
              defaultValue={values.message}
              aria-invalid={errors.message ? true : undefined}
              placeholder="What's on your mind"
              className={`${INPUT} resize-y`}
            />
          </Field>

          {state.message && (
            <p
              role="status"
              className={`border-b border-rule px-4 py-3 text-xs sm:px-6 ${
                state.status === "error" ? "text-accent" : "text-ink"
              }`}
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="group flex w-full items-center justify-between px-4 py-5 text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-accent hover:text-on-accent disabled:opacity-60 sm:px-6"
          >
            {pending ? "Sending…" : "Send it"}
            <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
          </button>
        </form>
      </div>
    </section>
  );
}
