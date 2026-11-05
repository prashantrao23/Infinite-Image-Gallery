import { useEffect, useMemo, useRef, useState } from "react";
import { getCollections, getAllCollectionPhotos } from "../services/collectionService";
import type { Collection } from "../types/collection";
import type { Image } from "../types/image";
import { DEBOUNCE_DELAY } from "../utils/constants";
import useDebounce from "./useDebounce";

const useCollections = (search: string) => {
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Collections");
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState<number | null>(null);

  const [collectionPhotos, setCollectionPhotos] = useState<Image[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const photosCache = useRef<Map<string, Image[]>>(new Map());

  useEffect(() => {
    let cancelled = false;

    const fetchCollections = async () => {
      setLoading(true);
      try {
        const data = await getCollections();
        if (!cancelled) {
          setCollections(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch collections:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCollections();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    return [
      "All Collections",
      ...new Set(collections.map((c) => c.title)),
    ];
  }, [collections]);

  const filteredCollections = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    let nextCollections = collections;

    if (selectedCategory !== "All Collections") {
      nextCollections = nextCollections.filter(
        (collection) => collection.title === selectedCategory
      );
    }

    if (!query) {
      return nextCollections;
    }

    return nextCollections.filter((collection) => {
      const haystack = `${collection.title} ${collection.description ?? ""} ${collection.user.name}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [collections, debouncedSearch, selectedCategory]);

  const selectedCollection =
    selectedCollectionIndex !== null
      ? filteredCollections[selectedCollectionIndex] ?? null
      : null;

  useEffect(() => {
    if (!selectedCollection) return;

    let isCancelled = false;
    const cached = photosCache.current.get(selectedCollection.id);

    const fetchPhotos = async () => {
      if (cached) {
        setCollectionPhotos(cached);
        return;
      }

      setLoadingPhotos(true);
      try {
        const photos = await getAllCollectionPhotos(
          selectedCollection.id,
          selectedCollection.total_photos
        );

        if (!isCancelled) {
          photosCache.current.set(selectedCollection.id, photos);
          setCollectionPhotos(photos);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to fetch collection photos:", error);
        }
      } finally {
        if (!isCancelled) {
          setLoadingPhotos(false);
        }
      }
    };

    fetchPhotos();

    return () => {
      isCancelled = true;
    };
  }, [selectedCollection]);

  const open = (index: number) => {
    setSelectedCollectionIndex(index);
  };

  const close = () => {
    setSelectedCollectionIndex(null);
    setCollectionPhotos([]);
    setLoadingPhotos(false);
  };

  const filterCollections = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    collections: filteredCollections,
    categories,
    selectedCategory,
    filterCollections,
    loading,
    open,
    close,
    selectedCollection,
    selectedCollectionIndex,
    collectionPhotos,
    loadingPhotos,
  };
};

export default useCollections;
