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
    collectionPhotos,
    loadingPhotos,
  } = useCollections(search);

  const slides: LightboxSlideItem[] = useMemo(() => {
    if (!selectedCollection) return [];

    // When full collection photos are loaded, show all photos
    if (collectionPhotos.length > 0) {
      return collectionPhotos.map((photo, index) => ({
        id: photo.id,
        url: photo.urls.regular,
        alt: photo.alt_description ?? `${selectedCollection.title} - photo ${index + 1}`,
        title: photo.user?.name ? `Photo by ${photo.user.name}` : selectedCollection.title,
        subtitle: `${index + 1} of ${collectionPhotos.length} · ${selectedCollection.title}`,
      }));
    }

    // Fallback: show preview photos while the full collection photos are fetching
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

    return uniquePhotos.map((photo, index) => ({
      id: photo.id,
      url: photo.urls.regular,
      alt: selectedCollection.title,
      title: selectedCollection.title,
      subtitle: `${index + 1} of ${uniquePhotos.length} · Curated by ${selectedCollection.user.name}`,
    }));
  }, [selectedCollection, collectionPhotos]);

  return (
    <>
      <div className="collections-header">
        <h1 className="collections-title">Collections</h1>
        <p className="collections-description">
          Thematic series and photo essays from independent photographers.
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
            loading={loadingPhotos}
          />
        </Suspense>
      )}
    </>
  );
};

export default Collections;
