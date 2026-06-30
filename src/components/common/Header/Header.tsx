import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

import "./Header.scss";
import { useGalleryContext } from "../../../context/GalleryContext";

const Header = () => {
  const { search, setSearch } = useGalleryContext();

  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="brand">
          THE FRAME
        </NavLink>
        <nav>
          <NavLink to="/" className="nav-link">
            Discover
          </NavLink>
          <NavLink to="/collections" className="nav-link">
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
