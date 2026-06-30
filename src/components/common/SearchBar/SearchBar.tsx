import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import "./SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const location = useLocation();

  const placeholder = useMemo(() => {
    switch (location.pathname) {
      case "/collections":
        return "Search collections...";

      default:
        return "Search for inspiration...";
    }
  }, [location.pathname]);

  return (
    <div className="search-bar">
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
