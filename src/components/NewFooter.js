import React from 'react';
import './NewFooter.css'; // We will create this CSS file next

function NewFooter() {
  return (
    <footer className="new-footer">
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/categories">Categories</a>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Your Wallpaper App. All Rights Reserved.</p>
        {/* Changed "projecet" to a more generic placeholder for a new footer */}
      </div>
    </footer>
  );
}

export default NewFooter;
