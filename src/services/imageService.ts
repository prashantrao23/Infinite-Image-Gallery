import api from "./api";

import type { Image } from "../types/image";
import type {
  ImageResponse,
  SearchImagesResponse,
} from "../types/api";

const PER_PAGE = 20;

export const getImages = async (
  page = 1
): Promise<ImageResponse> => {
  const { data } = await api.get<Image[]>("/photos", {
    params: {
      page,
      per_page: PER_PAGE,
    },
  });

  return {
    images: data,
    totalPages: Number.MAX_SAFE_INTEGER,
  };
};

export const searchImages = async (
  query: string,
  page = 1
): Promise<ImageResponse> => {
  const { data } =
    await api.get<SearchImagesResponse>(
      "/search/photos",
      {
        params: {
          query,
          page,
          per_page: PER_PAGE,
        },
      }
    );

  return {
    images: data.results,
    totalPages: data.total_pages,
  };
};