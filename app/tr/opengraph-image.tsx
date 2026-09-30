import { OG_SIZE, ogAlt, ogImage } from "@/lib/og-art";

export const alt = ogAlt("tr");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage("tr");
}
