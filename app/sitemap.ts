import type { MetadataRoute } from "next";
import { fleet, siteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const vanPages = fleet.map((van) => ({
    url: `${siteConfig.url}/flota/${van.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/flota`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/termeni-si-conditii`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/politica-de-confidentialitate`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/politica-cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...vanPages,
  ];
}
