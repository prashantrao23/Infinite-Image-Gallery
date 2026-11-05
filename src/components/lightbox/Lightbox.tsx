import { useEffect, useState } from "react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Lightbox.scss";
import closeIcon from "../../assets/close.svg";

export interface LightboxSlideItem {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

export interface LightboxProps {
  slides: LightboxSlideItem[];
  initialSlide?: number;
  onClose: () => void;
}

export const Lightbox = ({
  slides,
  initialSlide = 0,
  onClose,
}: LightboxProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialSlide);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[activeIndex] ?? slides[0];

  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <img src={closeIcon} alt="close" />
      </button>

      <Swiper
        modules={[Navigation, Keyboard, Zoom]}
        initialSlide={initialSlide}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 5 }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="lightbox-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`}>
            <div className="swiper-zoom-container">
              <img
                src={slide.url}
                alt={slide.alt || slide.title || "Gallery image"}
                loading="lazy"
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeSlide && (activeSlide.title || activeSlide.subtitle) && (
        <div className="lightbox-footer">
          {activeSlide.title && <h3>{activeSlide.title}</h3>}
          {activeSlide.subtitle && <p>{activeSlide.subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default Lightbox;

