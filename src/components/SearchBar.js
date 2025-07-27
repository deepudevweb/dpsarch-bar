// src/components/SearchBar.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaHistory, FaTrendingUp } from 'react-icons/fa';
import { wallpaperCategories } from '../api';
import './SearchBar.css';

const SearchBar = ({ onSubmit, placeholder = "Search for wallpapers..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

  // Popular search suggestions
  const popularSearches = [
    'Nature', 'Abstract', 'Mountains', 'Ocean', 'Space', 'Cars', 'Animals', 'City', 'Dark', 'Minimalist'
  ];

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('wallpaper_search_history') || '[]');
    setSearchHistory(history.slice(0, 5)); // Keep only last 5 searches
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  const performSearch = (term) => {
    // Add to search history
    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('wallpaper_search_history', JSON.stringify(newHistory));
    
    // Perform search
    onSubmit(term);
    setSearchTerm('');
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('wallpaper_search_history');
  };

  const getSuggestions = () => {
    if (!searchTerm) return [];
    
    const filtered = [...wallpaperCategories, ...popularSearches]
      .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 6);
    
    return filtered;
  };

  const suggestions = getSuggestions();

  return (
    <div className="search-container">
      <motion.div 
        className={`search-bar ${isFocused ? 'focused' : ''}`}
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 20px 40px rgba(102, 126, 234, 0.25)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="search-input"
              autoComplete="off"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  type="button"
                  onClick={clearSearch}
                  className="clear-button"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            type="submit"
            className="search-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!searchTerm.trim()}
          >
            <FaSearch />
            <span>Search</span>
          </motion.button>
        </form>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && (isFocused || suggestions.length > 0 || searchHistory.length > 0) && (
            <motion.div
              className="suggestions-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search History */}
              {searchHistory.length > 0 && !searchTerm && (
                <div className="suggestion-section">
                  <div className="suggestion-header">
                    <FaHistory className="section-icon" />
                    <span>Recent Searches</span>
                    <button onClick={clearHistory} className="clear-history-btn">
                      Clear
                    </button>
                  </div>
                  {searchHistory.map((item, index) => (
                    <motion.div
                      key={`history-${index}`}
                      className="suggestion-item"
                      onClick={() => performSearch(item)}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <FaHistory className="suggestion-icon" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {!searchTerm && (
                <div className="suggestion-section">
                  <div className="suggestion-header">
                    <FaTrendingUp className="section-icon" />
                    <span>Popular Searches</span>
                  </div>
                  {popularSearches.slice(0, 5).map((item, index) => (
                    <motion.div
                      key={`popular-${index}`}
                      className="suggestion-item"
                      onClick={() => performSearch(item)}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <FaTrendingUp className="suggestion-icon trending" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Filtered Suggestions */}
              {searchTerm && suggestions.length > 0 && (
                <div className="suggestion-section">
                  <div className="suggestion-header">
                    <FaSearch className="section-icon" />
                    <span>Suggestions</span>
                  </div>
                  {suggestions.map((item, index) => (
                    <motion.div
                      key={`suggestion-${index}`}
                      className="suggestion-item"
                      onClick={() => performSearch(item)}
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <FaSearch className="suggestion-icon" />
                      <span>
                        {item.slice(0, item.toLowerCase().indexOf(searchTerm.toLowerCase()))}
                        <strong className="highlight">
                          {item.slice(
                            item.toLowerCase().indexOf(searchTerm.toLowerCase()),
                            item.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length
                          )}
                        </strong>
                        {item.slice(item.toLowerCase().indexOf(searchTerm.toLowerCase()) + searchTerm.length)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {searchTerm && suggestions.length === 0 && (
                <div className="no-suggestions">
                  <FaSearch className="no-suggestions-icon" />
                  <span>No suggestions found</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
