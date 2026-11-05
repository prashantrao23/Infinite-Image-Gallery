import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useGalleryContext } from "@/context/GalleryContext";
import "./Header.scss";

const Header = () => {
  const { search, setSearch, clearSearch } = useGalleryContext();

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="brand" onClick={clearSearch}>
          THE FRAME
        </NavLink>
        <nav>
          <NavLink to="/" className="nav-link" onClick={clearSearch}>
            Discover
          </NavLink>
          <NavLink to="/collections" className="nav-link" onClick={clearSearch}>
            Collections
          </NavLink>
        </nav>
      </div>
      <div className="search-bar-container">
        <SearchBar value={search} onChange={setSearch} />
      </div>
    </header>
  );
};

export default Header;
