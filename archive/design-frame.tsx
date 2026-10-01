import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { DesignSwitcher } from "@/components/shared/design-switcher";
import { DesignSync } from "@/components/shared/design-sync";
import { DESIGN_COOKIE, SHOW_DESIGN_SWITCHER, resolveDesign, type DesignId } from "@/lib/designs";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * Which design this request gets: ?design= wins over the cookie so a shared
 * link shows what it says; otherwise the cookie; otherwise DEFAULT_DESIGN —
 * which is what "/" with no query (and every crawler) sees.
 */
export async function resolvePageDesign(searchParams: SearchParams): Promise<DesignId> {
  const { design: requested } = await searchParams;
  const saved = (await cookies()).get(DESIGN_COOKIE)?.value;
  return resolveDesign(typeof requested === "string" ? requested : saved);
}

/** The design's token scope, plus the picker while designs are being compared. */
export function DesignFrame({ id, children }: { id: DesignId; children: ReactNode }) {
  return (
    <div data-design={id} className="relative min-h-screen bg-canvas font-body text-ink">
      {children}
      {SHOW_DESIGN_SWITCHER && (
        <>
          <DesignSwitcher current={id} />
          <DesignSync id={id} />
        </>
      )}
    </div>
  );
}
