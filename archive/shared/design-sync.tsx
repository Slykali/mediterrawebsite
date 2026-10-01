"use client";

import { useEffect } from "react";

import { DESIGN_COOKIE, type DesignId } from "@/lib/designs";

/**
 * Keeps <html> and the cookie in step with the design the page rendered.
 * Matters when someone lands on a ?design= link: the layout only saw the
 * cookie, so the page background and color-scheme would otherwise be wrong.
 */
export function DesignSync({ id }: { id: DesignId }) {
  useEffect(() => {
    document.documentElement.dataset.design = id;
    document.cookie = `${DESIGN_COOKIE}=${id}; path=/; max-age=31536000; samesite=lax`;
  }, [id]);

  return null;
}
