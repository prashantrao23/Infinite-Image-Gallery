import "./CollectionItem.scss";

import type { Collection } from "../../../types/collection";

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
  return (
    <div className="collection-item" onClick={() => onCollectionClick(index)}>
      <div className="collection-image-grid">
        <div className="img-box div1">
          <img
            src={collection.cover_photo.urls.regular}
            alt={collection.title}
          />
        </div>

        {collection.preview_photos.slice(1, 4).map((photo, i) => (
          <div key={photo.id} className={`img-box div${i + 2}`}>
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
    </div>
  );
};

export default CollectionItem;
