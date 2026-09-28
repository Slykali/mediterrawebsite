"use client";

import { useEffect, useRef } from "react";

import type { DesignId } from "@/lib/designs";

/**
 * Hidden fields every contact form carries: which design sent it, when the
 * form was first shown (bots submit instantly), and a honeypot only bots fill.
 * The timestamp is set after mount — rendering Date.now() on the server would
 * never match the client.
 */
export function FormGuards({ design }: { design: DesignId }) {
  const startedAt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  return (
    <>
      <input type="hidden" name="design" defaultValue={design} />
      <input ref={startedAt} type="hidden" name="started_at" defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}
