import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import useGallery from "../hooks/useGallery";
import useCollections from "../hooks/useCollections";

interface GalleryContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
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
  const [search, setSearch] = useState("");
  const gallery = useGallery(search);
  const collections = useCollections(search);

  return (
    <GalleryContext.Provider
      value={{
        gallery,
        collections,
        search,
        setSearch,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGalleryContext = () => {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error(
      "useGalleryContext must be used inside GalleryProvider"
    );
  }

  return context;
};