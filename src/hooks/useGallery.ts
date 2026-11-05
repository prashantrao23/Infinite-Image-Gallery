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

export type ImageCategory = (typeof IMAGE_CATEGORIES)[number];

const useGallery = (search: string) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

  // Initial fetch / search query fetch
  useEffect(() => {
    let isCancelled = false;

    const fetchInitialImages = async () => {
      setLoading(true);
      try {
        const query = debouncedSearch.trim();
        const response = query
          ? await searchImages(query, 1)
          : await getImages(1);

        if (!isCancelled) {
          setImages(deduplicateImages(response.images));
          setPage(1);
          setHasMore(1 < response.totalPages);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to fetch images:", error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchInitialImages();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch]);

  // Load next page
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    const nextPage = page + 1;
    const query = debouncedSearch.trim();
    setLoading(true);

    try {
      const response = query
        ? await searchImages(query, nextPage)
        : await getImages(nextPage);

      setImages((prev) => deduplicateImages([...prev, ...response.images]));
      setPage(nextPage);
      setHasMore(nextPage < response.totalPages);
    } catch (error) {
      console.error("Failed to load more images:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, debouncedSearch]);

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
    setSearch(category === "All" ? "" : category);
  };

  return {
    search,
    images,
    loading,
    loaderRef,
    categories: IMAGE_CATEGORIES,
    selectedCategory,
    filterByCategory,
    hasMore,
  };
};

export default useGallery;
