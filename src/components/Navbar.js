import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaClock, 
  FaFire, 
  FaSearch, 
  FaUser, 
  FaEnvelope, 
  FaInfoCircle,
  FaShieldAlt,
  FaTh,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/latest', label: 'Latest', icon: FaClock },
    { path: '/featured', label: 'Featured', icon: FaFire },
    { path: '/categories', label: 'Categories', icon: FaTh },
  ];

  const secondaryItems = [
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/contact', label: 'Contact', icon: FaEnvelope },
    { path: '/privacy', label: 'Privacy', icon: FaShieldAlt },
    { path: '/account', label: 'Account', icon: FaUser },
  ];

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, isSecondary = false }) => (
    <motion.div
      className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
      onMouseEnter={() => setHoveredItem(item.path)}
      onMouseLeave={() => setHoveredItem(null)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={item.path} className="nav-link">
        <item.icon className="nav-icon" />
        <span className="nav-label">{item.label}</span>
        {hoveredItem === item.path && (
          <motion.div
            className="nav-underline"
            layoutId="underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </motion.div>
  );

  const HoverModal = ({ items, title }) => (
    <motion.div
      className="hover-modal"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="modal-header">
        <h3>{title}</h3>
      </div>
      <div className="modal-content">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="modal-item"
            onClick={() => setHoveredItem(null)}
          >
            <item.icon className="modal-icon" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="logo-icon">DP</div>
              <div className="logo-text">
                <span className="logo-main">WALLPAPERS</span>
                <span className="logo-tagline">HD Collection</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
            
            {/* More Menu */}
            <div 
              className="nav-item more-menu"
              onMouseEnter={() => setHoveredItem('more')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="nav-link">
                <FaBars className="nav-icon" />
                <span className="nav-label">More</span>
              </span>
              
              <AnimatePresence>
                {hoveredItem === 'more' && (
                  <HoverModal items={secondaryItems} title="More Options" />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-content">
                {[...navItems, ...secondaryItems].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mobile-nav-icon" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
