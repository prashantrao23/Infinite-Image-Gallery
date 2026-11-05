import type { Collection } from "../../../types/collection";
import "./CollectionItem.scss";

interface CollectionItemProps {
  collection: Collection;
  index: number;
  onCollectionClick: (index: number) => void;
}

const CollectionItem = ({
  collection,
  index,
  onCollectionClick,
}: CollectionItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCollectionClick(index);
    }
  };

  const coverUrl =
    collection.cover_photo?.urls?.small ||
    collection.cover_photo?.urls?.regular ||
    "";
  const coverBg = collection.cover_photo?.color || "#e8e8e8";
  const previewPhotos = (collection.preview_photos || []).slice(1, 4);

  return (
    <article
      className="collection-item"
      role="button"
      tabIndex={0}
      onClick={() => onCollectionClick(index)}
      onKeyDown={handleKeyDown}
      aria-label={`View collection: ${collection.title}`}
    >
      <div className="collection-image-grid">
        <div className="img-box div1" style={{ backgroundColor: coverBg }}>
          {coverUrl && (
            <img
              src={coverUrl}
              alt={collection.title}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {previewPhotos.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className={`img-box div${i + 2}`}
            style={{ backgroundColor: photo.color || "#e8e8e8" }}
          >
            <img
              src={photo.urls.small}
              alt={collection.title}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="collection-info">
        <h3 className="collection-title">{collection.title}</h3>
        <p className="collection-description">
          {collection.total_photos} Photos · Curated by {collection.user.name}
        </p>
      </div>
    </article>
  );
};

export default CollectionItem;
