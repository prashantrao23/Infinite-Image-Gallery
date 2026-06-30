import { Navigation, Keyboard, Zoom } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Lightbox.scss";

import type { Image } from "../../../types/image";
import { useEffect, useState } from "react";

import closeIcon from "../../../assets/close.svg";

interface LightboxProps {
  images: Image[];
  initialSlide: number | null;
  onClose: () => void;
}

const Lightbox = ({ images, initialSlide, onClose }: LightboxProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState<number>(initialSlide ?? 0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="lightbox">
      <button className="lightbox-close" onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </button>
      <Swiper
        modules={[Navigation, Keyboard, Zoom]}
        initialSlide={initialSlide ?? 0}
        slidesPerView={1}
        navigation
        keyboard
        zoom={{
          maxRatio: 5,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex ?? 0)}
        className="lightbox-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="swiper-zoom-container">
              <img src={image.urls.regular} alt={image.alt_description ?? ""} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {activeImage && (
        <div className="lightbox-footer">
          <h3>{activeImage.user.name}</h3>
          <p>
            {activeImage.width} × {activeImage.height}
          </p>
        </div>
      )}
    </div>
  );
};

export default Lightbox;
