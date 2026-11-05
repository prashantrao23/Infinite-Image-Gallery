import { useState } from "react";
import type { Image } from "@/types/image";
import "./ImageCard.scss";

interface ImageCardProps {
  image: Image;
  index: number;
  onClick: (index: number) => void;
}

const ImageCard = ({ image, index, onClick }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const preloadImage = (url: string) => {
    const preloader = new window.Image();
    preloader.src = url;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(index);
    }
  };

  return (
    <div className="image-card-container">
      <article
        className="image-card"
        role="button"
        tabIndex={0}
        onClick={() => onClick(index)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => preloadImage(image.urls.regular)}
        aria-label={`View photograph by ${image.user.name}`}
      >
        <div
          className="image-wrapper"
          style={{
            aspectRatio: `${image.width} / ${image.height}`,
            backgroundColor: image.color || "var(--bg-surface)",
          }}
        >
          <img
            src={image.urls.small}
            srcSet={`${image.urls.small} 400w, ${image.urls.regular} 1080w`}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
            alt={image.alt_description ?? `Photograph by ${image.user.name}`}
            loading="lazy"
            decoding="async"
            className={isLoaded ? "loaded" : ""}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="image-info">
          <span className="photographer">{image.user.name}</span>
        </div>
      </article>
    </div>
  );
};

export default ImageCard;
