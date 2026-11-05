import api from "./api";
import type { Collection } from "../types/collection";
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
