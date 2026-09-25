import type { MetadataRoute } from "next";
import { getGalleries, getBlogPosts } from "@/lib/api";

const BASE_URL = "https://luxvision.hr";
const LOCALES = ["hr", "en"] as const;

async function getAllBlogPosts(locale: string) {
  const allPosts = [];
  let page = 1;

  while (true) {
    const data = await getBlogPosts(locale, page);
    allPosts.push(...data.results);
    if (!data.next) break;
    page++;
  }

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const staticPages = ["", "/about", "/galleries", "/videos", "/blog", "/contact", "/privacy-policy"];
  for (const page of staticPages) {
    const hrUrl = `${BASE_URL}/hr${page}`;
    const enUrl = `${BASE_URL}/en${page}`;

    for (const [locale, url] of [["hr", hrUrl], ["en", enUrl]] as const) {
      entries.push({
        url,
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.7,
        alternates: { languages: { hr: hrUrl, en: enUrl } },
      });
    }
  }

  const [galleriesHr, galleriesEn] = await Promise.all([
    getGalleries("hr"),
    getGalleries("en"),
  ]);
  const galleriesEnById = new Map(galleriesEn.map((g) => [g.id, g]));

  for (const galleryHr of galleriesHr) {
    const galleryEn = galleriesEnById.get(galleryHr.id);
    if (!galleryEn) continue;

    const hrUrl = `${BASE_URL}/hr/galleries/${galleryHr.slug}`;
    const enUrl = `${BASE_URL}/en/galleries/${galleryEn.slug}`;

    for (const url of [hrUrl, enUrl]) {
      entries.push({
        url,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: { hr: hrUrl, en: enUrl } },
      });
    }
  }

  const [postsHr, postsEn] = await Promise.all([
    getAllBlogPosts("hr"),
    getAllBlogPosts("en"),
  ]);
  const postsEnById = new Map(postsEn.map((p) => [p.id, p]));

  for (const postHr of postsHr) {
    const postEn = postsEnById.get(postHr.id);
    if (!postEn) continue;

    const hrUrl = `${BASE_URL}/hr/blog/${postHr.slug}`;
    const enUrl = `${BASE_URL}/en/blog/${postEn.slug}`;

    for (const url of [hrUrl, enUrl]) {
      entries.push({
        url,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: { hr: hrUrl, en: enUrl } },
      });
    }
  }

  return entries;
}