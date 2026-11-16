import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR when opening the site via 127.0.0.1 instead of localhost
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Next 16: missing quality defaults to 75, then snaps to nearest allowed.
    // With only [90, 100], every Image without an explicit quality serves at 90.
    qualities: [90, 100],
    // AVIF can smear fine detail on soft AI sources; WebP is safer here.
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tdripjthqktwoaoubmoe.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
