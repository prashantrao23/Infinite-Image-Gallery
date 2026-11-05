import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface GalleryContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  clearSearch: () => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider = ({ children }: GalleryProviderProps) => {
  const [search, setSearch] = useState("");

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        search,
        setSearch,
        clearSearch,
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
    throw new Error("useGalleryContext must be used inside GalleryProvider");
  }

  return context;
};

export default GalleryContext;
