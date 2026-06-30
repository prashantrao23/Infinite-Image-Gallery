import type { Image } from "../types/image";

export const deduplicateImages = (
    images: Image[]
) => {

    const map = new Map();

    images.forEach(image=>{
        map.set(image.id,image);
    });

    return [...map.values()];
};