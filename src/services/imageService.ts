import api from "./api";
import type { Image } from "../types/image";
import type { ImageResponse, SearchImagesResponse } from "../types/api";
import { IMAGES_PER_PAGE } from "../utils/constants";

export const getImages = async (
  page = 1,
  perPage = IMAGES_PER_PAGE
): Promise<ImageResponse> => {
  const { data } = await api.get<Image[]>("/photos", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return {
    images: data,
    totalPages: Number.MAX_SAFE_INTEGER,
  };
};

export const searchImages = async (
  query: string,
  page = 1,
  perPage = IMAGES_PER_PAGE
): Promise<ImageResponse> => {
  const { data } = await api.get<SearchImagesResponse>("/search/photos", {
    params: {
      query,
      page,
      per_page: perPage,
    },
  });

  return {
    images: data.results,
    totalPages: data.total_pages,
  };
};
