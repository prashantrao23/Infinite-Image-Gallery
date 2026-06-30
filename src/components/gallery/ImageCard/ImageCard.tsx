import "./ImageCard.scss";

import type { Image } from "../../../types/image";

interface ImageCardProps {
  image: Image;
  index: number;
  onClick: (index: number) => void;
}

const ImageCard = ({ image, index, onClick }: ImageCardProps) => {
  const preloadImage = (url: string) => {
    const image = new Image();
    image.src = url;
  };

  return (
    <div className="image-card-container">
      <article
        className="image-card"
        onClick={() => onClick(index)}
        onMouseEnter={() => preloadImage(image.urls.regular)}
      >
        <img
          src={image.urls.small}
          srcSet={`
${image.urls.small} 400w,
${image.urls.regular} 1080w
`}
          alt={image.alt_description ?? "Unsplash Image"}
          loading="lazy"
          sizes="
(max-width:600px) 100vw,
(max-width:1200px) 50vw,
25vw"
          decoding="async"
        />

        <div className="image-info">
          <h4>{image.user.name}</h4>
        </div>
      </article>
    </div>
  );
};

export default ImageCard;
