import type { Collection } from "@/types/collection";
import arrowIcon from "@/assets/arrow.svg";
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
  const coverBg = collection.cover_photo?.color || "var(--bg-raised)";
  const previewPhotos = (collection.preview_photos || []).slice(1, 4);

  return (
    <article
      className="collection-card"
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
            style={{ backgroundColor: photo.color || "var(--bg-raised)" }}
          >
            <img
              src={photo.urls.small}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="collection-info">
        <div className="title-row">
          <h3 className="collection-title">{collection.title}</h3>
          <img src={arrowIcon} alt="" className="arrow-icon" aria-hidden="true" />
        </div>
        <p className="collection-meta">
          <span className="count">{collection.total_photos} photos</span>
          <span className="curator">Curated by {collection.user.name}</span>
        </p>
      </div>
    </article>
  );
};

export default CollectionItem;
