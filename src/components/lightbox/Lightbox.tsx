import { useEffect, useState } from "react";
import { Navigation, Keyboard, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Lightbox.scss";

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
  loading?: boolean;
}

export const Lightbox = ({
  slides,
  initialSlide = 0,
  onClose,
  loading = false,
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

  const currentActiveIndex = Math.min(activeIndex, slides.length - 1);
  const activeSlide = slides[currentActiveIndex] ?? slides[0];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Exhibition view">
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close exhibition view"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {loading && (
        <div className="lightbox-loader" role="status" aria-live="polite">
          <div className="lightbox-spinner" />
          <span>Fetching series…</span>
        </div>
      )}

      <Swiper
        key={`swiper-${slides.length}`}
        modules={[Navigation, Keyboard, Zoom]}
        initialSlide={currentActiveIndex}
        slidesPerView={1}
        navigation
        observer={true}
        observeParents={true}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 4 }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="lightbox-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`}>
            <div className="swiper-zoom-container">
              <img
                src={slide.url}
                alt={slide.alt || slide.title || "Exhibition photograph"}
                loading="lazy"
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeSlide && (
        <div className="lightbox-footer">
          {activeSlide.title && <h3 className="slide-title">{activeSlide.title}</h3>}
          {activeSlide.subtitle && <p className="slide-meta">{activeSlide.subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
