import { HomePage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "home");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <HomePage locale="en" searchParams={searchParams} />;
}
