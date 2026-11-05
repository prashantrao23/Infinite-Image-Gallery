import type { Image } from "../types/image";

export const deduplicateById = <T extends { id: string }>(items: T[]): T[] => {
  const map = new Map<string, T>();
  items.forEach((item) => {
    map.set(item.id, item);
  });
  return Array.from(map.values());
};

export const deduplicateImages = (images: Image[]): Image[] => {
  return deduplicateById(images);
};
