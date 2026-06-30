import type { Image } from "./image";

export interface SearchImagesResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

export interface ImageResponse {
  images: Image[];
  totalPages: number;
}