import ImageSkeleton from "../ImageSkeleton/ImageSkeleton";

import "./SkeletonGallery.scss";

const SkeletonGallery = () => {
  return (
    <section className="skeleton-gallery">
      {Array.from({ length: 12 }).map((_, index) => (
        <ImageSkeleton key={index} />
      ))}
    </section>
  );
};

export default SkeletonGallery;