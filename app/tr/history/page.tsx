import { HistoryPage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "history");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <HistoryPage locale="tr" searchParams={searchParams} />;
}
