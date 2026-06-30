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
              image={image} index={0} onClick={function (index: number): void {
                  throw new Error("Function not implemented.");
              } }        />
      ))}
    </section>
  );
};

export default Gallery;