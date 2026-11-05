import { lazy, Suspense, useMemo } from "react";
import MasonryGrid from "../components/gallery/MasonryGrid/MasonryGrid";
import InfiniteLoader from "../components/gallery/InfiniteLoader/InfiniteLoader";
import SkeletonGallery from "../components/gallery/SkeletonGallery/SkeletonGallery";
import { useGalleryContext } from "../context/GalleryContext";
import useGallery from "../hooks/useGallery";
import useLightbox from "../hooks/useLightbox";
import type { LightboxSlideItem } from "../components/lightbox/Lightbox";

// Lazy-load the heavy Lightbox component (includes Swiper)
const Lightbox = lazy(() => import("../components/lightbox/Lightbox"));

const Home = () => {
  const { search, setSearch } = useGalleryContext();
  const {
    images,
    loading,
    loaderRef,
    categories,
    selectedCategory,
    filterByCategory,
    hasMore,
  } = useGallery(search);

  const { selectedIndex, open, close } = useLightbox();

  const slides: LightboxSlideItem[] = useMemo(
    () =>
      images.map((img) => ({
        id: img.id,
        url: img.urls.regular,
        alt: img.alt_description ?? `Photo by ${img.user.name}`,
        title: img.user.name,
        subtitle: `${img.width} × ${img.height}`,
      })),
    [images]
  );

  return (
    <>
      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => filterByCategory(category, setSearch)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && images.length === 0 ? (
        <SkeletonGallery />
      ) : (
        <MasonryGrid images={images} onImageClick={open} />
      )}

      {selectedIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            slides={slides}
            initialSlide={selectedIndex}
            onClose={close}
          />
        </Suspense>
      )}

      <InfiniteLoader
        loaderRef={loaderRef}
        loading={loading}
        hasMore={hasMore}
      />
    </>
  );
};

export default Home;
