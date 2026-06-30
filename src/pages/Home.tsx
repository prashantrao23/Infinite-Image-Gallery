import MasonryGrid from "../components/gallery/MasonryGrid/MasonryGrid";
import InfiniteLoader from "../components/gallery/InfiniteLoader/InfiniteLoader";

import useLightbox from "../hooks/useLightbox";
import Lightbox from "../components/lightbox/Lightbox/Lightbox";
import SkeletonGallery from "../components/gallery/SkeletonGallery/SkeletonGallery";
import { useGalleryContext } from "../context/GalleryContext";

const Home = () => {
  const {
    gallery: { images, loading, loaderRef, categories, selectedCategory },
    setSearch,
    gallery,
  } = useGalleryContext();

  const { selectedIndex, open, close } = useLightbox();

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="category-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => gallery.filterByCategory(category, setSearch)}
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

      {selectedImage && (
        <Lightbox
          images={images}
          initialSlide={selectedIndex}
          onClose={close}
        />
      )}

      <InfiniteLoader loaderRef={loaderRef} loading={loading} />
    </>
  );
};

export default Home;
