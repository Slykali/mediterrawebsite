"use client";

import { useActionState, type InputHTMLAttributes } from "react";

import { submitContact } from "@/app/actions";
import { FormGuards } from "@/components/shared/form-guards";
import { Reveal } from "@/components/shared/reveal";
import { INTERESTS, initialContactState, type Interest } from "@/lib/contact";
import { site } from "@/lib/site";
import { H2, KICKER } from "./ui";

/** Each option has to finish the sentence "I'd like to …". */
const PHRASE: Record<Interest, string> = {
  crew: "join the team",
  sponsor: "sponsor the team",
  mentor: "mentor the team",
  other: "talk about something else",
};

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

  return (
    <section id="contact" className="border-t border-ink bg-panel/40">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal className="text-center">
          <p className={`text-accent ${KICKER}`}>Letters</p>
          <h2 className={`mt-3 ${H2}`}>
            Write to <em>us</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-mute italic">
            Fill in the blanks. Someone on the team reads every letter.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            action={formAction}
            noValidate
            className="relative mt-12 border border-ink bg-canvas p-6 text-xl sm:p-10 sm:text-2xl"
            style={{ lineHeight: LINE_HEIGHT }}
          >
            <FormGuards design="editorial" />

            <p>Dear {site.team.number},</p>
            <p className="mt-2">
              My name is
              <Blank
                name="name"
                autoComplete="name"
                placeholder="your name"
                aria-label="Your name"
                defaultValue={values.name}
                error={errors.name}
                className="w-[11ch]"
              />
              , and you can write back to me at
              <Blank
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-label="Your email"
                defaultValue={values.email}
                error={errors.email}
                className="w-[15ch]"
              />
              .
            </p>
            <p>
              I&rsquo;d like to{" "}
              <span className="relative inline-block">
                <select
                  name="interest"
                  aria-label="What you'd like to do"
                  defaultValue={values.interest ?? "crew"}
                  // field-sizing hugs the chosen option where supported; elsewhere it's the widest one.
                  className="appearance-none border-b border-ink bg-transparent pr-6 pl-1 text-accent italic outline-none [field-sizing:content] focus:border-accent"
                >
                  {INTERESTS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {PHRASE[option.value]}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-1 bottom-0 text-sm text-accent">
                  &#9662;
                </span>
              </span>
              .
            </p>

            <textarea
              name="message"
              rows={4}
              aria-label="Your message"
              aria-invalid={errors.message ? true : undefined}
              defaultValue={values.message}
              placeholder={"The rest of the letter…"}
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
              <span className="text-lg text-mute italic">&mdash; Signed, and sent from the website</span>
              <button
                type="submit"
                disabled={pending}
                className="border border-ink px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-canvas disabled:opacity-60"
              >
                {pending ? "Posting…" : "Send the letter →"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
