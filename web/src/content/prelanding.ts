import type { BrandId } from "@/config/brands";

export const introductions = [
  {
    eyebrow: "Direct & operational",
    lead: "Critical reach.",
    headline: "Advanced inspection.",
    summary: "Certified rope access execution. Diagnosing inaccessible structures, delivering the solution.",
  },
  {
    eyebrow: "High-level industrial",
    lead: "Where others",
    headline: "can’t reach.",
    summary: "Aerial data. Boots-on-rope precision. Uncompromising asset integrity from visual survey to physical repair.",
  },
  {
    eyebrow: "Problem-to-solution",
    lead: "Engineered",
    headline: "access.",
    summary: "Confined space inspection. Heavy-duty height solutions. Zero scaffolding, zero blind spots, minimal operational downtime.",
  },
] as const;

export const choices: Record<BrandId, { number: string; image: string; imageAlt: string }> = {
  skyriders: {
    number: "01",
    image: "/images/rope-cutout.png",
    imageAlt: "Rope-access technician suspended by ropes",
  },
  skyi: {
    number: "02",
    image: "/images/elios_3.png",
    imageAlt: "Elios 3 inspection drone inside its protective cage",
  },
};

export const industries = [
  "Petroleum", "Oil and Gas", "Mining", "Construction", "Facilities Maintenance", "Power Generation",
  "Telecommunications", "Municipal Infrastructure", "Buildings & Roofing", "Households",
] as const;

export const socialLinks = [
  { name: "Facebook", href: "https://web.facebook.com/SkyridersIndustrialRopeAccess" },
  { name: "LinkedIn", href: "https://za.linkedin.com/company/skyriders-access-specialists-pty-ltd" },
] as const;
