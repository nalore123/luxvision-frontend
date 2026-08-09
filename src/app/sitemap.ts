import type { MetadataRoute } from "next";
import { getGalleries, getBlogPosts } from "@/lib/api";

const BASE_URL = "https://luxvision.hr";
const LOCALES = ["hr", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = ["", "/about", "/galleries", "/videos", "/blog", "/contact"];
  for (const locale of LOCALES) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.7,
      });
    }
  }

  for (const locale of LOCALES) {
    const galleries = await getGalleries(locale);
    for (const gallery of galleries) {
      entries.push({
        url: `${BASE_URL}/${locale}/galleries/${gallery.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const locale of LOCALES) {
    const { results: posts } = await getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}