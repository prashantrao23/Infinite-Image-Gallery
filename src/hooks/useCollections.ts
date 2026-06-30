import { useEffect, useMemo, useState } from "react";

import { getCollections } from "../services/collectionService";

import type { Collection } from "../types/collection";
import useLightbox from "./useLightbox";

const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    open,
    close,
  } = useLightbox();
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("All Collections");


  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();

        setCollections(data);
        setFilteredCollections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const categories = useMemo(() => {
    return [
      "All Collections",
      ...new Set(collections.map((c) => c.title)),
    ];
  }, [collections]);

  const filterCollections = (category: string) => {
    setSelectedCategory(category);

    if (category === "All Collections") {
      setFilteredCollections(collections);
      return;
    }

    setFilteredCollections(
      collections.filter(
        (collection) => collection.title === category
      )
    );
  };

  return {
    collections: filteredCollections,
    categories,
    selectedCategory,
    filterCollections,
    loading,
    open,
  };
};

export default useCollections;