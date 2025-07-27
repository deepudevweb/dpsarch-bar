// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import CategorySidebar from './components/CategorySidebar';
import ImageModal from './components/ImageModal';
import HeroCarousel from './components/HeroCarousel';
import Footer from './components/Footer';

// Pages
import LatestPage from './pages/LatestPage';
import FeaturedPage from './pages/FeaturedPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// API
import { 
  searchImages, 
  getLatestImages, 
  getFeaturedImages, 
  getCategoryImages 
} from './api';

import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setCurrentPage(1);

    if (path === '/') {
      setCurrentView('home');
      // Don't auto-load images on home page - let hero carousel handle it
      setImages([]);
      setCurrentQuery('');
      setSelectedCategory('');
    } else if (path === '/latest') {
      setCurrentView('latest');
      fetchLatestData(1);
    } else if (path === '/featured') {
      setCurrentView('featured');
      fetchFeaturedData(1);
    }
  }, [location.pathname]);

  const fetchLatestData = async (page) => {
    setIsLoading(true);
    setCurrentQuery('');
    setSelectedCategory('');
    try {
      const response = await getLatestImages(page);
      setImages(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching latest images:", error);
      setImages([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  };

  const fetchFeaturedData = async (page) => {
    setIsLoading(true);
    setCurrentQuery('');
    setSelectedCategory('');
    try {
      const response = await getFeaturedImages(page);
      setImages(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching featured images:", error);
      setImages([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  };

  const performSearch = async (query, page, isCategorySearch = false) => {
    setIsLoading(true);
    try {
      let response;
      if (isCategorySearch) {
        response = await getCategoryImages(query, page);
        setSelectedCategory(query);
        setCurrentQuery('');
        setCurrentView('category');
      } else {
        response = await searchImages(query, page);
        setCurrentQuery(query);
        setSelectedCategory('');
        setCurrentView('search');
      }
      
      setImages(response.results);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  };

  const handleSearchSubmit = async (term) => {
    performSearch(term, 1, false);
  };

  const handleCategorySelect = async (category) => {
    performSearch(category, 1, true);
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      if (currentView === 'latest') {
        fetchLatestData(nextPage);
      } else if (currentView === 'featured') {
        fetchFeaturedData(nextPage);
      } else if (currentView === 'search' && currentQuery) {
        performSearch(currentQuery, nextPage, false);
      } else if (currentView === 'category' && selectedCategory) {
        performSearch(selectedCategory, nextPage, true);
      }
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      if (currentView === 'latest') {
        fetchLatestData(prevPage);
      } else if (currentView === 'featured') {
        fetchFeaturedData(prevPage);
      } else if (currentView === 'search' && currentQuery) {
        performSearch(currentQuery, prevPage, false);
      } else if (currentView === 'category' && selectedCategory) {
        performSearch(selectedCategory, prevPage, true);
      }
    }
  };

  const handleImageClick = (image) => {
    setSelectedModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModalImage(null);
  };

  const HomePage = () => (
    <div className="home-page">
      <HeroCarousel onImageClick={handleImageClick} />
      
      <div className="home-content">
        <motion.section 
          className="search-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="search-header">
            <h2>Find Your Perfect Wallpaper</h2>
            <p>Search through millions of high-quality wallpapers</p>
          </div>
          <SearchBar onSubmit={handleSearchSubmit} />
        </motion.section>

        {images.length > 0 && (
          <motion.section 
            className="results-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-header">
              <h3>
                {currentView === 'search' && `Search Results for "${currentQuery}"`}
                {currentView === 'category' && `${selectedCategory} Wallpapers`}
              </h3>
            </div>
            <ImageList 
              images={images} 
              onImageClick={handleImageClick} 
              loading={isLoading} 
            />
          </motion.section>
        )}
      </div>
    </div>
  );

  const MainContent = () => (
    <div className="main-content-wrapper">
      {currentView !== 'home' && (
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="page-header-content">
            <h1 className="page-title">
              {currentView === 'latest' && 'Latest Wallpapers'}
              {currentView === 'featured' && 'Featured Wallpapers'}
              {currentView === 'search' && `Search Results for "${currentQuery}"`}
              {currentView === 'category' && `${selectedCategory} Wallpapers`}
            </h1>
            <SearchBar onSubmit={handleSearchSubmit} />
          </div>
        </motion.div>
      )}
      
      <ImageList 
        images={images} 
        onImageClick={handleImageClick} 
        loading={isLoading} 
      />
      
      {images.length > 0 && !isLoading && totalPages > 1 && (
        <motion.div 
          className="pagination-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className="pagination-btn prev"
            onClick={handlePrevPage} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="pagination-info">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          <button 
            className="pagination-btn next"
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="app">
      <Toaster position="bottom-right" />
      <Navbar />
      
      <div className="app-layout">
        <CategorySidebar 
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/latest" element={<MainContent />} />
            <Route path="/featured" element={<MainContent />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
      
      <AnimatePresence>
        {isModalOpen && selectedModalImage && (
          <ImageModal 
            image={selectedModalImage} 
            onClose={handleCloseModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
