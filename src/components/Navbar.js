import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" onClick={closeMobileMenu}>DP Wallpapers</Link>
      </div>
      <button className={`hamburger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
        <li><Link to="/latest" onClick={closeMobileMenu}>Latest Wallpapers</Link></li>
        <li><Link to="/top" onClick={closeMobileMenu}>Top Wallpapers</Link></li>
        <li><Link to="/upload" onClick={closeMobileMenu}>Upload</Link></li>
        <li><Link to="/account" onClick={closeMobileMenu}>Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
