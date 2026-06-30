import "./Gallery.scss";

import type { Image } from "../../../types/image";

import ImageCard from "../ImageCard/ImageCard";

interface GalleryProps {
  images: Image[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <section className="gallery">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          index={0}
          onClick={() => undefined}
        />
      ))}
    </section>
  );
};

export default Gallery;