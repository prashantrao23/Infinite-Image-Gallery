import { useState } from "react";

const useLightbox = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = (index: number) => {
    setSelectedIndex(index);
  };

  const close = () => {
    setSelectedIndex(null);
  };

  return {
    selectedIndex,
    open,
    close,
  };
};

export default useLightbox;