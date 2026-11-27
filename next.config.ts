import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const emptyPolyfill = path.join(rootDir, "lib/empty-polyfill.js");

const nextConfig: NextConfig = {
  // Allow HMR when opening the site via 127.0.0.1 instead of localhost
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Inline CSS into HTML so Slow 4G does not wait on stylesheet round-trips
    // before first paint (PageSpeed "render-blocking requests").
    inlineCss: true,
  },
  // Drop Next's always-on modern polyfills (Lighthouse "Legacy JavaScript").
  // Safe for our audience on current Chrome/Safari/Firefox/Edge.
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/empty-polyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./lib/empty-polyfill.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": emptyPolyfill,
      "next/dist/build/polyfills/polyfill-module": emptyPolyfill,
    };
    return config;
  },
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
