import { RobotPage } from "@/components/pages/pages";
import type { SearchParams } from "@/components/pages/design-frame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("tr", "robot2026");

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <RobotPage locale="tr" searchParams={searchParams} />;
}
