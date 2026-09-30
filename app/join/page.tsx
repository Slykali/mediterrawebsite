import { JoinPage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "join");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <JoinPage locale="en" searchParams={searchParams} />;
}
