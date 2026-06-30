import { useEffect, useState } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {

  const isCollectionsPage = window.location.pathname === "/collections";
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search for Inspiration...");
  
  useEffect(() => {
    if (isCollectionsPage) {
      setSearchPlaceholder("Search collections...");
    } else {
      setSearchPlaceholder("Search for Inspiration...");
    }
  }, [isCollectionsPage]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
};

export default SearchBar;