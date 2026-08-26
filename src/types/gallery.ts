export interface GalleryImage {
  id: number;
  image: string;
  alt_text: string;
  order: number;
  width: number | null;
  height: number | null;
}

export interface GalleryListItem {
  id: number;
  title: string;
  slug: string;
  cover_image: GalleryImage | null;
  order: number;
}

export interface GalleryDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: GalleryImage[];
  meta_title: string;
  meta_description: string;
}