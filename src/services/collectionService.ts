import api from "./api";

import type { Collection } from "../types/collection";

export const getCollections = async (
  page = 1,
  perPage = 12
): Promise<Collection[]> => {
  const { data } = await api.get<Collection[]>("/collections", {
    params: {
      page,
      per_page: perPage,
    },
  });

  return data;
};