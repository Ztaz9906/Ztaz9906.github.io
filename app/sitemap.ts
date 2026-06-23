import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

import { PROJECTS } from "@/lib/data/projects";

const BASE_URL = "https://ztaz9906-github-io.vercel.app";
const LOCALES = ["en", "es"] as const;

function getBlogSlugs() {
  const blogDir = path.join(process.cwd(), "content", "blog", "en");

  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function localizedEntries(
  pathForLocale: (locale: (typeof LOCALES)[number]) => string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: `${BASE_URL}${pathForLocale(locale)}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localizedEntries((locale) => `/${locale}`, "weekly", 1.0),
    ...localizedEntries((locale) => `/${locale}/blog`, "weekly", 0.8),
    ...localizedEntries((locale) => `/${locale}/projects`, "monthly", 0.8),
  ];

  const blogRoutes = getBlogSlugs().flatMap((slug) =>
    localizedEntries((locale) => `/${locale}/blog/${slug}`, "monthly", 0.7),
  );

  const projectRoutes = PROJECTS.filter((project) => project.hasCaseStudy).flatMap(
    (project) =>
      localizedEntries(
        (locale) => `/${locale}/projects/${project.slug}`,
        "monthly",
        0.7,
      ),
  );

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
