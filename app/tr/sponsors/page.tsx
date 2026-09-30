import { SponsorsPage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "sponsors");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <SponsorsPage locale="tr" searchParams={searchParams} />;
}
