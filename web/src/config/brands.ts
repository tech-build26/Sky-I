export const brandIds = ["skyriders", "skyi"] as const;
export type BrandId = (typeof brandIds)[number];

export const brands = {
  skyriders: {
    id: "skyriders",
    name: "Skyriders",
    domain: "https://ropeaccess.co.za",
    background: "/images/hero-bg.jpg",
    logo: "/images/sky-logo-20261005.png",
    logoAlt: "Skyriders Industrial Rope Access",
    logoWidth: 1500,
    logoHeight: 1250,
    verticalLabel: "ACCESS / INSPECTION / MAINTENANCE",
    description: "Skilled access. Practical solutions.",
    discipline: "Access specialists",
  },
  skyi: {
    id: "skyi",
    name: "Sky I",
    domain: "https://skyi.co.za",
    background: "/images/sky-bg.jpg",
    logo: "/images/sky-i-logo-20261005.png",
    logoAlt: "Sky I Industrial Drone Inspection",
    logoWidth: 1254,
    logoHeight: 1254,
    verticalLabel: "INDUSTRIAL / DRONE INSPECTION",
    description: "A clearer view of hard-to-reach places.",
    discipline: "Drone inspection",
  },
} as const;

export function isBrandId(value: string): value is BrandId {
  return brandIds.some((id) => id === value);
}

export function getSiteBrand(): (typeof brands)[BrandId] {
  return brands.skyi;
}

export function getSiteUrl(brand: BrandId): URL {
  const url = new URL(process.env.SITE_URL || brands[brand].domain);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("SITE_URL must use HTTPS outside localhost");
  }
  return url;
}

export function homeHref(site: BrandId, destination: BrandId): string {
  if (site === destination) return "/home/";
  const override = destination === "skyriders"
    ? process.env.SKYRIDERS_SITE_URL
    : process.env.SKYI_SITE_URL;
  const url = new URL("/", override || brands[destination].domain);
  if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
    throw new Error(`${destination} destination must use HTTPS outside localhost`);
  }
  return url.toString();
}
