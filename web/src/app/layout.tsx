import type { Metadata } from "next";
import localFont from "next/font/local";
import { getSiteBrand, getSiteUrl } from "@/config/brands";
import "./globals.css";
import { BrandEntry } from "@/components/prelanding/BrandEntry";

const jost = localFont({ src: "../fonts/jost.woff2", variable: "--font-jost", display: "swap", weight: "100 900" });
const cormorant = localFont({ src: "../fonts/cormorant.woff2", variable: "--font-cormorant", display: "swap", weight: "300 700" });

export function generateMetadata(): Metadata {
  const site = getSiteBrand();
  return {
    metadataBase: getSiteUrl(site.id),
    title: `${site.name} | Critical reach. Advanced inspection.`,
    description: `Critical reach. Advanced inspection. ${site.description}`,
    alternates: { canonical: "/" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZA"
      suppressHydrationWarning
      className={`${jost.variable} ${cormorant.variable}`}
    >
      <head><script dangerouslySetInnerHTML={{ __html: "try{const e=new URLSearchParams(location.search).get('_entry');if(location.pathname.replace(/\\/$/,'')==='/home'&&(e==='skyriders'||e==='skyi')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.brandEntry=e}catch{}" }} /></head>
      <body suppressHydrationWarning>{children}<BrandEntry /></body>
    </html>
  );
}
