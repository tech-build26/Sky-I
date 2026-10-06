// ===== Sky I business configuration =====
export const skyISite = {
  name: "Sky I",
  legalName: "",
  phone: "+27 11 312 0450",
  whatsapp: "",
  email: "info@ropeaccess.co.za",
  address: "44 Monte Carlo Crescent, Kyalami Business Park, Midrand, 1685",
  regionalOffice: { name: "eMalahleni", address: "24 Langa Crescent, Shop 2 & 6, Corridor Hill, eMalahleni", phone: "+27 13 692 5219" },
  operatingHours: "",
  regions: [] as string[],
  socialLinks: [] as { label: string; url: string }[],
  registration: "",
  certifications: [] as string[],
  insurance: "",
  safetyStats: "",
  pilotCount: "",
  logo: "",
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || "",
  searchVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  title: "Sky I | Industrial Drone Inspections in South Africa",
  description: "Industrial drone visual inspection for hard-to-reach spaces. Sky I documents the condition; Skyriders brings rope access to the next step.",
} as const;

// ===== Validated sister-company destination =====
export function getSkyridersUrl(fallback: string): string {
  const value = process.env.NEXT_PUBLIC_SKYRIDERS_URL || fallback;
  const url = new URL(value);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
    throw new Error("NEXT_PUBLIC_SKYRIDERS_URL must be an HTTPS URL (HTTP is allowed for local previews).");
  }
  return new URL("/", url).toString();
}
