import React from 'react';
import './Navbar.css'; // We will create this CSS file next

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a> {/* Placeholder logo */}
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/latest">Latest Wallpapers</a></li>
        <li><a href="/top">Top Wallpapers</a></li>
        <li><a href="/upload">Upload</a></li>
        <li><a href="/account">Account</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
