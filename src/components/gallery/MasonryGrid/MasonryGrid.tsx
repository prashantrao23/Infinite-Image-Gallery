import { memo } from "react";
import Masonry from "@mui/lab/Masonry";
import type { Image } from "../../../types/image";
import ImageCard from "../ImageCard/ImageCard";
import "./MasonryGrid.scss";

interface MasonryGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

const MasonryGrid = ({ images, onImageClick }: MasonryGridProps) => {
  return (
    <Masonry
      className="masonry-grid"
      columns={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      spacing={{
        xs: 1,
        sm: 2,
      }}
    >
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          index={index}
          onClick={onImageClick}
        />
      ))}
    </Masonry>
  );
};

export default memo(MasonryGrid);
