// src/components/Navbar.js - Excerpt showing NavLink usage
import React, { useState } from 'react';
// Changed Link to NavLink
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close menu, e.g., when a link is clicked on mobile
  const closeMobileMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Use NavLink if you want logo to have active state, or keep as Link if not */}
        <NavLink to="/" onClick={closeMobileMenu}>DP Wallpapers</NavLink>
      </div>
      <button className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        {/* Use NavLink and define an activeClassName or rely on default 'active' class */}
        <li><NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink></li>
        <li><NavLink to="/latest" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Latest Wallpapers</NavLink></li>
        <li><NavLink to="/top" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Top Wallpapers</NavLink></li>
        <li><NavLink to="/upload" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Upload</NavLink></li>
        <li><NavLink to="/account" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Account</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
