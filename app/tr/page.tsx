import { HomePage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "home");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <HomePage locale="tr" searchParams={searchParams} />;
}
