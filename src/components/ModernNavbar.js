import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModernNavbar.css';
// import SearchBar from './SearchBar';

function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (index) => {
    if (window.innerWidth <= 768) {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  return (
    <nav className={`modern-navbar ${isOpen ? 'responsive' : ''}`}>
      <div className="modern-navbar-logo">
        <Link to="/">DP Wallpapers</Link>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className="modern-navbar-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className={`nav-item ${openDropdown === 1 ? 'open' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown(1)}
            onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
            onClick={() => handleDropdown(1)}>
          <span className="nav-link">Categories</span>
          <ul className="dropdown-menu">
            <li className="dropdown-item"><Link to="/categories/nature">Nature</Link></li>
            <li className="dropdown-item"><Link to="/categories/animals">Animals</Link></li>
            <li className="dropdown-item"><Link to="/categories/movies">Movies</Link></li>
            <li className="dropdown-item"><Link to="/categories/cars">Cars</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/latest" className="nav-link">Latest</Link>
        </li>
        <li className="nav-item">
          <Link to="/top" className="nav-link">Top</Link>
        </li>
        <li className="nav-item">
          <Link to="/upload" className="nav-link">Upload</Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link">Account</Link>
        </li>
      </ul>
      {/* <div className="modern-search-bar">
        <SearchBar onSubmit={onSearchSubmit} />
      </div> */}
    </nav>
  );
}

export default ModernNavbar;
