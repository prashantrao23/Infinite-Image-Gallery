import { lazy, Suspense, useMemo } from "react";
import CollectionItem from "../components/gallery/CollectionItem/CollectionItem";
import SkeletonGallery from "../components/gallery/SkeletonGallery/SkeletonGallery";
import { useGalleryContext } from "../context/GalleryContext";
import useCollections from "../hooks/useCollections";
import type { LightboxSlideItem } from "../components/lightbox/Lightbox";

// Lazy-load the heavy Lightbox component (includes Swiper)
const Lightbox = lazy(() => import("../components/lightbox/Lightbox"));

const Collections = () => {
  const { search } = useGalleryContext();
  const {
    collections,
    categories,
    selectedCategory,
    filterCollections,
    loading,
    open,
    close,
    selectedCollection,
  } = useCollections(search);

  const slides: LightboxSlideItem[] = useMemo(() => {
    if (!selectedCollection) return [];

    const allPhotos = [
      selectedCollection.cover_photo,
      ...(selectedCollection.preview_photos || []),
    ];

    const seen = new Set<string>();
    const uniquePhotos = allPhotos.filter((photo) => {
      if (!photo || seen.has(photo.id)) return false;
      seen.add(photo.id);
      return true;
    });

    return uniquePhotos.map((photo) => ({
      id: photo.id,
      url: photo.urls.regular,
      alt: selectedCollection.title,
      title: selectedCollection.title,
      subtitle: `${selectedCollection.total_photos} Photos · Curated by ${selectedCollection.user.name}`,
    }));
  }, [selectedCollection]);

  return (
    <>
      <div className="collections-header">
        <h1 className="collections-title">Curated Collections</h1>
        <p className="collections-description">
          Explore thematic sets of visual narratives hand-picked by our
          editorial team.
        </p>
      </div>

      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => filterCollections(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="collections-grid">
        {loading && collections.length === 0 ? (
          <SkeletonGallery />
        ) : (
          collections.map((collection, index) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
              onCollectionClick={open}
            />
          ))
        )}
      </div>

      {selectedCollection && (
        <Suspense fallback={null}>
          <Lightbox
            slides={slides}
            initialSlide={0}
            onClose={close}
          />
        </Suspense>
      )}
    </>
  );
};

export default Collections;
