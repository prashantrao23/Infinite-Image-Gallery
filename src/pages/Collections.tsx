import CollectionItem from "../components/gallery/CollectionItem/CollectionItem";
import SkeletonGallery from "../components/gallery/SkeletonGallery/SkeletonGallery";
import CollectionLightbox from "../components/lightbox/Lightbox/CollectionLightbox";

import { useGalleryContext } from "../context/GalleryContext";

const Collections = () => {
  const {
    collections: {
      collections,
      categories,
      selectedCategory,
      filterCollections,
      loading,
      open,
      close,
      selectedCollection,
    },
  } = useGalleryContext();

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
        <CollectionLightbox collection={selectedCollection} onClose={close} />
      )}
    </>
  );
};

export default Collections;
