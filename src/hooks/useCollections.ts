import { useEffect, useMemo, useState } from "react";

import { getCollections } from "../services/collectionService";

import type { Collection } from "../types/collection";
import { DEBOUNCE_DELAY } from "../utils/constants";
import useDebounce from "./useDebounce";

const useCollections = (search: string) => {
  const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All Collections");

  const [selectedCollectionIndex, setSelectedCollectionIndex] =
    useState<number | null>(null);

  const open = (index: number) => {
    setSelectedCollectionIndex(index);
  };

  const close = () => {
    setSelectedCollectionIndex(null);
  };

  const selectedCollection =
    selectedCollectionIndex !== null
      ? collections[selectedCollectionIndex]
      : null;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();

        setCollections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const query = debouncedSearch.trim().toLowerCase();
    let nextCollections = collections;

    if (selectedCategory !== "All Collections") {
      nextCollections = nextCollections.filter(
        (collection) => collection.title === selectedCategory
      );
    }

    if (!query) {
      setFilteredCollections(nextCollections);
      return;
    }

    const filteredBySearch = nextCollections.filter((collection) => {
      const haystack = `${collection.title} ${collection.description ?? ""} ${collection.user.name}`.toLowerCase();
      return haystack.includes(query);
    });

    setFilteredCollections(filteredBySearch);
  }, [collections, debouncedSearch, selectedCategory]);

  const categories = useMemo(() => {
    return [
      "All Collections",
      ...new Set(collections.map((c) => c.title)),
    ];
  }, [collections]);

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
    selectedCollection,
    selectedCollectionIndex,
    close,
  };
};

export default useCollections;