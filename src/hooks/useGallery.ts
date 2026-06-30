import { useCallback, useEffect, useState } from "react";

import useDebounce from "./useDebounce";
import useInfiniteScroll from "./useInfiniteScroll";

import { getImages, searchImages } from "../services/imageService";

import type { Image } from "../types/image";

import { DEBOUNCE_DELAY } from "../utils/constants";
import { deduplicateImages } from "../utils/deduplicateImages";

export const IMAGE_CATEGORIES = [
  "All",
  "Nature",
  "Travel",
  "Architecture",
  "Technology",
  "Food",
  "Animals",
  "People",
  "Fashion",
  "Art",
] as const;

const useGallery = (search: string) => {
  // const [search, setSearch] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = IMAGE_CATEGORIES;

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  const fetchImages = useCallback(
    async (currentPage: number, reset = false) => {
      setLoading(true);

      try {
        const response = debouncedSearch
          ? await searchImages(debouncedSearch, currentPage)
          : await getImages(currentPage);

        setImages((prev) =>
          reset
            ? response.images
            : deduplicateImages([
              ...prev,
              ...response.images,
            ])
        );

        setHasMore(currentPage < response.totalPages);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);

    fetchImages(1, true);
  }, [debouncedSearch, fetchImages]);

  useEffect(() => {
    if (page === 1) return;

    fetchImages(page);
  }, [page, fetchImages]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  const loaderRef = useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore: loadMore,
  });

  const filterByCategory = (
    category: string,
    setSearch: (value: string) => void
  ) => {
    setSelectedCategory(category);

    setImages([]);
    setPage(1);
    setHasMore(true);

    setSearch(category === "All" ? "" : category);
  };

  return {
    search,
    images,
    loading,
    loaderRef,
    categories,
    selectedCategory,
    filterByCategory
  };
};

export default useGallery;