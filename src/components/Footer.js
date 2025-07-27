import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaHeart,
  FaDownload,
  FaImages,
  FaUsers,
  FaStar,
  FaArrowUp
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { name: 'Latest Wallpapers', path: '/latest' },
      { name: 'Featured', path: '/featured' },
      { name: 'Categories', path: '/categories' },
      { name: 'Popular', path: '/popular' }
    ],
    categories: [
      { name: 'Nature', path: '/category/nature' },
      { name: 'Abstract', path: '/category/abstract' },
      { name: 'Space', path: '/category/space' },
      { name: 'Cars', path: '/category/cars' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      url: 'https://github.com/deepuprajapati',
      color: '#333'
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      url: 'https://linkedin.com/in/deepuprajapati',
      color: '#0077b5'
    },
    { 
      name: 'Twitter', 
      icon: FaTwitter, 
      url: 'https://twitter.com/deepuprajapati',
      color: '#1da1f2'
    },
    { 
      name: 'Instagram', 
      icon: FaInstagram, 
      url: 'https://instagram.com/deepuprajapati',
      color: '#e4405f'
    },
    { 
      name: 'Email', 
      icon: FaEnvelope, 
      url: 'mailto:deepu@example.com',
      color: '#667eea'
    }
  ];

  const stats = [
    { icon: FaImages, count: '1M+', label: 'Wallpapers' },
    { icon: FaDownload, count: '500K+', label: 'Downloads' },
    { icon: FaUsers, count: '100K+', label: 'Users' },
    { icon: FaStar, count: '4.9', label: 'Rating' }
  ];

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <FaArrowUp />
      </motion.button>

      {/* Stats Section */}
      <div className="footer-stats">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <stat.icon className="stat-icon" />
              <div className="stat-content">
                <span className="stat-count">{stat.count}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-container">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="footer-logo">
              <div className="logo-icon">DP</div>
              <div className="logo-text">
                <span className="logo-main">WALLPAPERS</span>
                <span className="logo-tagline">HD Collection</span>
              </div>
            </Link>
            
            <p className="footer-description">
              Discover and download stunning high-quality wallpapers for all your devices. 
              From nature to abstract art, find the perfect background to express your style.
            </p>

            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ '--hover-color': social.color }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="footer-links">
            {/* Explore */}
            <motion.div 
              className="link-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="section-title">Explore</h4>
              <ul className="link-list">
                {footerLinks.explore.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div 
              className="link-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="section-title">Categories</h4>
              <ul className="link-list">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div 
              className="link-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="section-title">Company</h4>
              <ul className="link-list">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <motion.div 
            className="footer-bottom-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="copyright">
              <p>
                © {new Date().getFullYear()} DP Wallpapers. Made with{' '}
                <FaHeart className="heart-icon" /> by{' '}
                <strong>Deepu Prajapati</strong>
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <Link to="/privacy" className="bottom-link">Privacy</Link>
              <Link to="/terms" className="bottom-link">Terms</Link>
              <Link to="/cookies" className="bottom-link">Cookies</Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </footer>
  );
};

export default Footer;
