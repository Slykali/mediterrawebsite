"use client";

import { useActionState, type ReactNode } from "react";

import { submitContact } from "@/app/actions";
import { FormGuards } from "@/components/shared/form-guards";
import { Reveal } from "@/components/shared/reveal";
import { INTERESTS, initialContactState, isChecked } from "@/lib/contact";
import { MONO, PAD, SheetHeader } from "./ui";

const BOX = "border-r border-b border-ink/60";
const INPUT = "mt-2 w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-mute/60";

function BoxField({
  n,
  label,
  error,
  className = "",
  children,
}: {
  n: number;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block p-4 transition-colors focus-within:bg-panel/70 ${BOX} ${className}`}>
      <span className={`flex justify-between gap-4 text-mute ${MONO}`}>
        <span>
          {n}. {label}
        </span>
        {error && <span className="text-accent">{error}</span>}
      </span>
      {children}
    </label>
  );
}

/** A request-for-information sheet: numbered boxes, square checkboxes, a stamp. */
export function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  return (
    <section id="contact" className={`py-20 ${PAD}`}>
      <SheetHeader
        sheet="05"
        title="Request for information"
        note="Fill it out. Someone on the team reads every RFI and replies within a few days."
      />

      <Reveal>
        <form action={formAction} noValidate className="relative mt-10 grid border-t border-l border-ink/60 bg-canvas/60 lg:grid-cols-2">
          <FormGuards design="blueprint" />

          <BoxField n={1} label="Name" error={errors.name}>
            <input
              name="name"
              autoComplete="name"
              defaultValue={values.name}
              aria-invalid={errors.name ? true : undefined}
              placeholder="Full name"
              className={INPUT}
            />
          </BoxField>
          <BoxField n={2} label="Email" error={errors.email}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={values.email}
              aria-invalid={errors.email ? true : undefined}
              placeholder="you@example.com"
              className={INPUT}
            />
          </BoxField>

          <fieldset className={`p-4 lg:col-span-2 ${BOX}`}>
            <legend className="sr-only">Nature of request</legend>
            <span aria-hidden className={`flex justify-between text-mute ${MONO}`}>
              <span>3. Nature of request</span>
              {errors.interest && <span className="text-accent">{errors.interest}</span>}
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {INTERESTS.map((option) => (
                <label key={option.value} className="group flex cursor-pointer items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase">
                  <input
                    type="radio"
                    name="interest"
                    value={option.value}
                    defaultChecked={isChecked(state, option.value)}
                    className="peer sr-only"
                  />
                  <span className="flex size-4 shrink-0 items-center justify-center border border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    <span className="size-2 bg-accent opacity-0 group-has-[:checked]:opacity-100" />
                  </span>
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <BoxField n={4} label="Details" error={errors.message} className="lg:col-span-2">
            <textarea
              name="message"
              rows={6}
              defaultValue={values.message}
              aria-invalid={errors.message ? true : undefined}
              placeholder="What do you need from us, or what can you offer?"
              className={`${INPUT} resize-y`}
            />
          </BoxField>

          <div className={`flex flex-wrap items-center justify-between gap-4 p-4 lg:col-span-2 ${BOX}`}>
            <p role="status" className={`font-mono text-xs ${state.status === "error" ? "text-accent" : "text-ink"}`}>
              {state.message ?? <span className="text-mute">All fields required.</span>}
            </p>
            <button
              type="submit"
              disabled={pending}
              className="border-2 border-accent px-6 py-3 font-mono text-xs tracking-[0.2em] text-accent uppercase transition-colors hover:bg-accent hover:text-on-accent disabled:opacity-60"
            >
              {pending ? "Logging…" : "Submit RFI"}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
