import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16: missing quality defaults to 75, then snaps to nearest allowed.
    // With only [90, 100], every Image without an explicit quality serves at 90.
    qualities: [90, 100],
    // AVIF can smear fine detail on soft AI sources; WebP is safer here.
    formats: ["image/webp"],
  },
};

export default nextConfig;
