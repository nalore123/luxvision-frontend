export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  embed_url: string | null;
  order: number;
}

export interface PaginatedVideos {
  count: number;
  next: string | null;
  previous: string | null;
  results: Video[];
}