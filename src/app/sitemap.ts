import type { MetadataRoute } from "next";
import { getServices, getBlogPosts, getProjects } from "@/lib/queries";

const BASE_URL = "https://alkater.gr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/certifications", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/team", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/equipment", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) => [
    {
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          el: `${BASE_URL}${page.path}`,
          en: `${BASE_URL}/en${page.path}`,
        },
      },
    },
  ]);

  let serviceEntries: MetadataRoute.Sitemap = [];
  try {
    const services = await getServices("el");
    serviceEntries = services.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          el: `${BASE_URL}/services/${s.slug}`,
          en: `${BASE_URL}/en/services/${s.slug}`,
        },
      },
    }));
  } catch {}

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts("el");
    blogEntries = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          el: `${BASE_URL}/blog/${p.slug}`,
          en: `${BASE_URL}/en/blog/${p.slug}`,
        },
      },
    }));
  } catch {}

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects("el");
    projectEntries = projects.map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          el: `${BASE_URL}/projects/${p.slug}`,
          en: `${BASE_URL}/en/projects/${p.slug}`,
        },
      },
    }));
  } catch {}

  return [...staticEntries, ...serviceEntries, ...blogEntries, ...projectEntries];
}
