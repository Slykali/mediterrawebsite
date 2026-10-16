import Image from "next/image";

/**
 * The team logo: a blue gear with an orange outline around "MEDI TERRA",
 * on a small white tile, since the dark blue disappears on the site's
 * near-black. alt is empty because the team name always sits right next to it.
 */
export function TeamLogo({ className = "size-7" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-sm bg-white p-0.5 ${className}`}>
      <Image src="/mediterra-logo.svg" alt="" width={380} height={368} unoptimized className="size-full object-contain" />
    </span>
  );
}
