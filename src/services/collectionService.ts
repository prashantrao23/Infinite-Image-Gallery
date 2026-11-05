import api from "./api";
import type { Collection } from "../types/collection";
import type { Image } from "../types/image";
import { COLLECTIONS_PER_PAGE } from "../utils/constants";

export const getCollections = async (
  page = 1,
  perPage = COLLECTIONS_PER_PAGE
): Promise<Collection[]> => {
  const { data } = await api.get<Collection[]>("/collections", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return data;
};

export const getCollectionPhotos = async (
  collectionId: string,
  page = 1,
  perPage = 30
): Promise<Image[]> => {
  const { data } = await api.get<Image[]>(`/collections/${collectionId}/photos`, {
    params: {
      page,
      per_page: perPage,
    },
  });

  return data;
};

export const getAllCollectionPhotos = async (
  collectionId: string,
  totalPhotos?: number
): Promise<Image[]> => {
  const perPage = 30;
  const total = totalPhotos ?? perPage;
  const pagesToFetch = Math.min(Math.ceil(total / perPage), 4);

  if (pagesToFetch <= 1) {
    return getCollectionPhotos(collectionId, 1, perPage);
  }

  const pagePromises = Array.from({ length: pagesToFetch }, (_, i) =>
    getCollectionPhotos(collectionId, i + 1, perPage)
  );

  const results = await Promise.all(pagePromises);
  return results.flat();
};
