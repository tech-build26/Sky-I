import type { Metadata } from "next";
import { SkyIHome } from "@/components/skyi/SkyIHome";
import { homeHref } from "@/config/brands";
import { skyISite } from "@/config/site";

export const metadata: Metadata = {
  title: skyISite.title,
  description: skyISite.description,
  alternates: { canonical: "/home/" },
  openGraph: { title: skyISite.title, description: skyISite.description, url: "/home/", siteName: "Sky I", locale: "en_ZA", type: "website" },
  twitter: { card: "summary", title: skyISite.title, description: skyISite.description },
};

export default function HomePage() {
  return <SkyIHome skyridersHref={homeHref("skyi", "skyriders")} />;
}
