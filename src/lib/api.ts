import type { GalleryListItem, GalleryDetail } from "@/types/gallery";
import type { BlogPostListItem, BlogPostDetail, PaginatedBlogPosts } from "@/types/blog";
import type { Video, PaginatedVideos } from "@/types/video";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const isDev = process.env.NODE_ENV === "development";

export async function getGalleries(locale: string): Promise<GalleryListItem[]> {
  const res = await fetch(`${API_URL}/galleries/`, {
    headers: { "Accept-Language": locale },
    ...(isDev ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch galleries");
  }

  return res.json();
}

export async function getGallery(
  slug: string,
  locale: string
): Promise<GalleryDetail | null> {
  const res = await fetch(`${API_URL}/galleries/${slug}/`, {
    headers: { "Accept-Language": locale },
    ...(isDev ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch gallery");

  return res.json();
}

export async function getBlogPosts(
  locale: string,
  page: number = 1
): Promise<PaginatedBlogPosts> {
  const res = await fetch(`${API_URL}/blog/posts/?page=${page}`, {
    headers: { "Accept-Language": locale },
    ...(isDev ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
  });
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export async function getBlogPost(slug: string, locale: string): Promise<BlogPostDetail | null> {
  const res = await fetch(`${API_URL}/blog/posts/${slug}/`, {
    headers: { "Accept-Language": locale },
    ...(isDev ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog post");
  return res.json();
}

export async function getVideos(
  locale: string,
  page: number = 1
): Promise<PaginatedVideos> {
  const res = await fetch(`${API_URL}/videos/?page=${page}`, {
    headers: { "Accept-Language": locale },
    ...(isDev ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}