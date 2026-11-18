import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR when opening the site via 127.0.0.1 instead of localhost
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Lower defaults for PageSpeed; still allow 90 for rare detail shots.
    qualities: [65, 75, 85, 90],
    formats: ["image/avif", "image/webp"],
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
