import { JoinPage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "join");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <JoinPage locale="tr" searchParams={searchParams} />;
}
