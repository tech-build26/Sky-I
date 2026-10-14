import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  images: { qualities: [75, 90] },
};

export default nextConfig;
