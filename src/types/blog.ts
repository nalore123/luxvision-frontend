export interface BlogPostListItem {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  published_at: string | null;
}

export interface BlogPostDetail extends BlogPostListItem {
  content: string;
  meta_title: string;
  meta_description: string;
}

export interface PaginatedBlogPosts {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPostListItem[];
}