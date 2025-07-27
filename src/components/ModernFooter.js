import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
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
    <a href="https://www.facebook.com/share/171xjbmQqv/" target="_blank" rel="noreferrer">
      <FaFacebookF />
    </a>
    <a href="https://www.instagram.com/prajapati0841?igsh=Y2pqeTRubTl6bWgw" target="_blank" rel="noreferrer">
      <FaInstagram />
    </a>
    <a href="https://www.linkedin.com/in/deepu-prajapati-49683a23b/" target="_blank" rel="noreferrer">
      <FaLinkedin />
    </a>
  </div>
      </div>
      </div>
      <div className="footer-bottom">
  &copy; {new Date().getFullYear()} DP Wallpapers | All Rights Reserved
  <p>
    Developed by Deepu Prajapati{' '}
    <a href="https://github.com/deepudevweb" target="_blank" rel="noreferrer">
      <FaGithub />
    </a>
  </p>
</div>

    </footer>
  );
}

export default ModernFooter;
