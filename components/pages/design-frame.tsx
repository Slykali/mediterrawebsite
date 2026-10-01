import type { ReactNode } from "react";

import type { DesignId } from "@/lib/designs";

/** The design's token scope around a page. */
export function DesignFrame({ id, children }: { id: DesignId; children: ReactNode }) {
  return (
    <div data-design={id} className="relative min-h-screen bg-canvas font-body text-ink">
      {children}
    </div>
  );
}
