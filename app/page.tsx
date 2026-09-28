import { cookies } from "next/headers";

import { DESIGN_COMPONENTS } from "@/components/designs/registry";
import { DesignSwitcher } from "@/components/shared/design-switcher";
import { DesignSync } from "@/components/shared/design-sync";
import { DESIGN_COOKIE, SHOW_DESIGN_SWITCHER, resolveDesign } from "@/lib/designs";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const { design: requested } = await searchParams;
  const saved = (await cookies()).get(DESIGN_COOKIE)?.value;

  // ?design= wins over the cookie so a shared link shows what it says.
  const id = resolveDesign(typeof requested === "string" ? requested : saved);
  const Design = DESIGN_COMPONENTS[id];

  return (
    <div data-design={id} className="relative min-h-screen bg-canvas font-body text-ink">
      <Design />
      {SHOW_DESIGN_SWITCHER && (
        <>
          <DesignSwitcher current={id} />
          <DesignSync id={id} />
        </>
      )}
    </div>
  );
}
