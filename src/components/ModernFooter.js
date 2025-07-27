import React from 'react';
import { Link } from 'react-router-dom';
import './ModernFooter.css';

function ModernFooter() {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h4>About DP Wallpapers</h4>
          <p>
            Your one-stop destination for high-quality wallpapers. Browse our vast collection and personalize your device.
          </p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/upload">Upload</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} DP Wallpapers | All Rights Reserved
      </div>
    </footer>
  );
}

export default ModernFooter;
