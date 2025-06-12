import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './NewFooter.css';

function NewFooter() {
  return (
    <footer className="new-footer">
      <div className="footer-links">
        <Link to="/about">About</Link> {/* Changed to Link */}
        <Link to="/contact">Contact</Link> {/* Changed to Link */}
        <Link to="/privacy">Privacy Policy</Link> {/* Changed to Link */}
        <Link to="/categories">Categories</Link> {/* Changed to Link */}
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} DP Wallpapers. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default NewFooter;
