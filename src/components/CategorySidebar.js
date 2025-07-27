import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaNature, FaGamepad, FaCar, FaPalette, FaBuilding, FaMountain, 
  FaWater, FaRocket, FaHeart, FaMoon, FaSun, FaLeaf, FaCat,
  FaFootballBall, FaMusic, FaFilm, FaCode, FaGem, FaFire,
  FaSnowflake, FaFlower, FaTh, FaChevronRight, FaSearch
} from 'react-icons/fa';
import { wallpaperCategories } from '../api';
import './CategorySidebar.css';

const CategorySidebar = ({ onSelectCategory, selectedCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Category icons mapping
  const categoryIcons = {
    'Nature': FaNature,
    'Abstract': FaPalette,
    'Animals': FaCat,
    'Architecture': FaBuilding,
    'Art': FaPalette,
    'Cars': FaCar,
    'City': FaBuilding,
    'Dark': FaMoon,
    'Fantasy': FaGem,
    'Flowers': FaFlower,
    'Food': FaHeart,
    'Landscape': FaMountain,
    'Minimalist': FaGem,
    'Mountains': FaMountain,
    'Ocean': FaWater,
    'People': FaHeart,
    'Space': FaRocket,
    'Sports': FaFootballBall,
    'Technology': FaCode,
    'Travel': FaMountain,
    'Vintage': FaFilm,
    'Wildlife': FaCat
  };

  // Extended categories with popular wallpaper types
  const extendedCategories = [
    ...wallpaperCategories,
    'Gaming', 'Music', 'Movies', 'Anime', 'Sci-Fi', 'Horror',
    'Christmas', 'Halloween', 'Valentine', 'Summer', 'Winter',
    'Spring', 'Autumn', 'Sunset', 'Sunrise', 'Night', 'Forest',
    'Desert', 'Beach', 'River', 'Lake', 'Clouds', 'Rain',
    'Snow', 'Fire', 'Lightning', 'Aurora', 'Galaxy', 'Nebula',
    'Planets', 'Stars', 'Moon', 'Sun', 'Earth'
  ].sort();

  const getIconForCategory = (category) => {
    const IconComponent = categoryIcons[category] || FaTh;
    return IconComponent;
  };

  const filteredCategories = extendedCategories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    if (window.innerWidth <= 768) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="category-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaTh />
        <span>Categories</span>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronRight />
        </motion.div>
      </button>

      {/* Sidebar */}
      <motion.aside 
        className={`category-sidebar ${isExpanded ? 'expanded' : ''}`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <div className="sidebar-title">
            <FaTh className="title-icon" />
            <h2>Categories</h2>
          </div>
          
          {/* Search Categories */}
          <div className="category-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="category-search-input"
            />
          </div>
        </div>

        <div className="sidebar-content">
          {/* Popular Categories */}
          <div className="category-section">
            <h3 className="section-title">Popular</h3>
            <div className="category-grid">
              {['Nature', 'Abstract', 'Space', 'Cars', 'Animals', 'Dark'].map((category, index) => {
                const IconComponent = getIconForCategory(category);
                return (
                  <motion.button
                    key={category}
                    className={`category-item popular ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <IconComponent className="category-icon" />
                    <span className="category-name">{category}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* All Categories */}
          <div className="category-section">
            <h3 className="section-title">
              All Categories ({filteredCategories.length})
            </h3>
            <div className="category-list">
              <AnimatePresence>
                {filteredCategories.map((category, index) => {
                  const IconComponent = getIconForCategory(category);
                  return (
                    <motion.button
                      key={category}
                      className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(category)}
                      whileHover={{ x: 5, backgroundColor: '#f8f9fa' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.02 }}
                      layout
                    >
                      <IconComponent className="category-icon" />
                      <span className="category-name">{category}</span>
                      <motion.div
                        className="category-arrow"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: 5 }}
                      >
                        <FaChevronRight />
                      </motion.div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Featured Collections */}
          <div className="category-section">
            <h3 className="section-title">Collections</h3>
            <div className="collection-grid">
              {[
                { name: 'Trending Now', icon: FaFire, gradient: 'linear-gradient(45deg, #ff6b6b, #ffd93d)' },
                { name: 'Editor\'s Choice', icon: FaGem, gradient: 'linear-gradient(45deg, #667eea, #764ba2)' },
                { name: 'Seasonal', icon: FaSnowflake, gradient: 'linear-gradient(45deg, #4ecdc4, #44a08d)' },
                { name: 'New Uploads', icon: FaSun, gradient: 'linear-gradient(45deg, #ffecd2, #fcb69f)' }
              ].map((collection, index) => (
                <motion.button
                  key={collection.name}
                  className="collection-item"
                  onClick={() => handleCategoryClick(collection.name.toLowerCase())}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ background: collection.gradient }}
                >
                  <collection.icon className="collection-icon" />
                  <span className="collection-name">{collection.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="sidebar-footer">
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Wallpapers</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CategorySidebar;
