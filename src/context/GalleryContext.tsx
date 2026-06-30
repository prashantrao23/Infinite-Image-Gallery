import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import useGallery from "../hooks/useGallery";
import useCollections from "../hooks/useCollections";

interface GalleryContextType {
  gallery: ReturnType<typeof useGallery>;
  collections: ReturnType<typeof useCollections>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(
  undefined
);

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider = ({
  children,
}: GalleryProviderProps) => {
  const gallery = useGallery();
  const collections = useCollections();

  return (
    <GalleryContext.Provider
      value={{
        gallery,
        collections,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error(
      "useGalleryContext must be used inside GalleryProvider"
    );
  }

  return context;
};