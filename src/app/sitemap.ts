import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pawteller.com";

  // In production, fetch these dynamically from MongoDB/CMS
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/quiz",
    "/calculators",
    "/privacy",
    "/terms",
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes];
}
