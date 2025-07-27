import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ModernNavbar.css';

function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Prevent background scroll when navbar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null);
  };

  const handleDropdown = (index) => {
    if (window.innerWidth <= 768) {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  // Close navbar when clicking a link (on mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  };

  return (
    <nav className="modern-navbar">
      <div className="modern-navbar-logo">
        <Link to="/" onClick={handleLinkClick}>DP Wallpapers</Link>
      </div>
      <div
        className={`hamburger-menu${isOpen ? ' open' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        tabIndex={0}
        role="button"
      >
        <span />
        <span />
        <span />
      </div>
      {/* Overlay for mobile */}
      <div className={`mobile-overlay${isOpen ? ' show' : ''}`} onClick={toggleMenu}></div>
      <ul className={`modern-navbar-links${isOpen ? ' open' : ''}`}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
        </li>
        <li
          className={`nav-item${openDropdown === 1 ? ' open' : ''}`}
          onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown(1)}
          onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
          onClick={() => handleDropdown(1)}
        >
          <span className="nav-link">Categories</span>
          <ul className="dropdown-menu">
            <li className="dropdown-item"><Link to="/categories/nature" onClick={handleLinkClick}>Nature</Link></li>
            <li className="dropdown-item"><Link to="/categories/animals" onClick={handleLinkClick}>Animals</Link></li>
            <li className="dropdown-item"><Link to="/categories/movies" onClick={handleLinkClick}>Movies</Link></li>
            <li className="dropdown-item"><Link to="/categories/cars" onClick={handleLinkClick}>Cars</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/latest" className="nav-link" onClick={handleLinkClick}>Latest</Link>
        </li>
        <li className="nav-item">
          <Link to="/top" className="nav-link" onClick={handleLinkClick}>Top</Link>
        </li>
        <li className="nav-item">
          <Link to="/upload" className="nav-link" onClick={handleLinkClick}>Upload</Link>
        </li>
        <li className="nav-item">
          <Link to="/account" className="nav-link" onClick={handleLinkClick}>Account</Link>
        </li>
      </ul>
    </nav>
  );
}

export default ModernNavbar;