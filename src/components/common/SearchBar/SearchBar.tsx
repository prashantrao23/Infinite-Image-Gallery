import { useLocation } from "react-router-dom";
import searchIcon from "@/assets/search-icon.svg";
import "./SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const location = useLocation();
  const placeholder =
    location.pathname === "/collections"
      ? "Search collections"
      : "Search photographs";

  return (
    <div className="search-bar">
      <img src={searchIcon} alt="" className="search-icon" aria-hidden="true" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
