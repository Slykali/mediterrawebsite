"use client";

import { useActionState, type ReactNode } from "react";

import { submitContact } from "@/app/actions";
import { FormGuards } from "@/components/shared/form-guards";
import { INTERESTS, initialContactState, isChecked } from "@/lib/contact";
import { MONO, SectionHead, WIDE } from "./ui";

const FIELD_TEXT = "mt-3 w-full bg-transparent font-bold outline-none placeholder:text-ink/35 [font-stretch:110%]";
const INPUT = `${FIELD_TEXT} text-2xl sm:text-3xl`;
const TEXTAREA = `${FIELD_TEXT} resize-y text-xl sm:text-2xl`;

function Field({ n, label, error, children }: { n: string; label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block bg-canvas p-4 transition-colors focus-within:bg-panel sm:p-6">
      <span className={`flex justify-between gap-4 ${MONO}`}>
        <span>
          {n} &mdash; {label}
        </span>
        {error && <span className="bg-ink px-1.5 text-canvas normal-case">{error}</span>}
      </span>
      {children}
    </label>
  );
}

export function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <section id="contact" className="border-t-4 border-ink">
      <SectionHead n="04" label="Contact">
        Send it.
      </SectionHead>

      <form action={formAction} noValidate className="relative border-t-4 border-ink">
        <FormGuards design="hazard" />

        <div className="grid gap-1 bg-ink md:grid-cols-2">
          <Field n="01" label="Name" error={errors.name}>
            <input
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              aria-invalid={errors.name ? true : undefined}
              placeholder="YOUR NAME"
              className={INPUT}
            />
          </Field>
          <Field n="02" label="Email" error={errors.email}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              placeholder="YOU@EXAMPLE.COM"
              className={INPUT}
            />
          </Field>
        </div>

        <fieldset className="border-t-4 border-ink p-4 sm:p-6">
          <legend className="sr-only">I want to</legend>
          <span aria-hidden className={`flex justify-between gap-4 ${MONO}`}>
            <span>03 &mdash; I want to</span>
            {errors.interest && <span className="bg-ink px-1.5 text-canvas normal-case">{errors.interest}</span>}
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            {INTERESTS.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  defaultChecked={isChecked(state, option.value)}
                  className="peer sr-only"
                />
                <span className="block border-4 border-ink px-4 py-2 font-mono text-sm font-semibold uppercase transition-colors hover:bg-panel peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="border-t-4 border-ink">
          <Field n="04" label="Message" error={errors.message}>
            <textarea
              name="message"
              rows={5}
              defaultValue={values.message}
              aria-invalid={errors.message ? true : undefined}
              placeholder="YOUR MESSAGE"
              className={TEXTAREA}
            />
          </Field>
        </div>

        <div className="border-t-4 border-ink">
          {state.message && (
            <p
              role="status"
              className={`border-b-4 border-ink px-4 py-3 sm:px-6 ${MONO} ${
                state.status === "error" ? "bg-ink text-canvas" : ""
              }`}
            >
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className={`group flex w-full items-center justify-between bg-ink px-4 py-6 text-canvas transition-colors hover:bg-canvas hover:text-ink disabled:opacity-60 sm:px-6 ${WIDE} text-2xl sm:text-4xl`}
          >
            {pending ? "Sending…" : "Send it"}
            <span className="transition-transform group-hover:translate-x-2">&rarr;</span>
          </button>
        </div>
      </form>
    </section>
  );
}
