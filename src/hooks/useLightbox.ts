import { useCallback, useState } from "react";
// import type { Image } from "../types/image";

const useLightbox = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const next = useCallback((length: number) => {
    setSelectedIndex(prev => {
      if (prev === null) return null;

      return (prev + 1) % length;
    });
  }, []);

  const previous = useCallback((length: number) => {
    setSelectedIndex(prev => {
      if (prev === null) return null;

      return (prev - 1 + length) % length;
    });
  }, []);

  return {
    selectedIndex,
    open,
    close,
    next,
    previous,
  };
};

export default useLightbox;