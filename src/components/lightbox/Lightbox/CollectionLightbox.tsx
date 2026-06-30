import type { Collection } from "../../../types/collection";
import { Navigation, Keyboard, Zoom } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Lightbox.scss";

import closeIcon from "../../../assets/close.svg";
import { useEffect } from "react";

interface CollectionLightboxProps {
  collection: Collection;
  onClose: () => void;
}

const CollectionLightbox = ({
  collection,
  onClose,
}: CollectionLightboxProps) => {
  const photos = [collection.cover_photo, ...collection.preview_photos];
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="lightbox">
      <button className="lightbox-close" onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </button>
      <Swiper
        modules={[Navigation, Keyboard, Zoom]}
        slidesPerView={1}
        navigation
        keyboard
        zoom={{
          maxRatio: 5,
        }}
        className="lightbox-swiper"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id + index}>
            <div className="swiper-zoom-container">
              <img src={photo.urls.regular} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lightbox-footer">
        <h3>{collection.title}</h3>
        <p>
          {collection.total_photos} Photos · Curated by {collection.user.name}
        </p>
      </div>
    </div>
  );
};

export default CollectionLightbox;
