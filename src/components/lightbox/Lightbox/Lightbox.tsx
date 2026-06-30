import { createPortal } from "react-dom";
import "./Lightbox.scss";
import { useEffect } from "react";

import type { Image } from "../../../types/image";

interface LightboxProps {
  image: Image;
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onClose]);

  return createPortal(
    <div
      className="lightbox"
      onClick={onClose}
    >
      <button
        className="close-btn"
        onClick={onClose}
      >
        ×
      </button>
      <img
        src={image.urls.full}
        alt={image.alt_description ?? "Unsplash image"}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
};

export default Lightbox;