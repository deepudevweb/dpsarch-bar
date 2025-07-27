// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import { searchImages, getLatestImages } from './api'; // Updated import
import ModernFooter from './components/ModernFooter';
import ModernSidebar from './components/ModernSidebar';
import ImageModal from './components/ImageModal';
import WallpaperCarousel from './components/WallpaperCarousel';
import './App.css';

// Import Page Components
import LatestPage from './pages/LatestPage'; // Will be rendered via MainContent now
import TopPage from './pages/TopPage';
import UploadPage from './pages/UploadPage';
import AccountPage from './pages/AccountPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('search'); // 'search', 'latest', 'category'
  const [carouselImages, setCarouselImages] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await getLatestImages(1, 5); // Fetch 5 latest images
        setCarouselImages(response.results);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };
    fetchCarouselImages();
  }, []);

  useEffect(() => {
    const path = location.pathname;
    setCurrentPage(1); // Reset page to 1 on any route change for simplicity here

    if (path === '/latest') {
      setCurrentView('latest');
      fetchLatestRouteData(1);
    } else if (path === '/top') {
      setCurrentView('search'); // Or a new 'top' view if preferred for different UI
      performSearch('wallpapers', 1, false); // Search for 'wallpapers'
    } else if (path === '/') {
      // Default home page logic (e.g., show latest or clear)
      if (!currentQuery && !selectedCategory) { // Only if no active search/category
        setCurrentView('latest');
        fetchLatestRouteData(1);
      } else {
        // If there was an active query/category, it remains.
        // This part might need refinement based on desired UX for navigating "home"
        // For instance, should it always clear and show latest, or remember last search?
        // For now, if a search/category was active, it will persist unless explicitly cleared.
        // Let's ensure currentView is set correctly if navigating back to / with active search
        setCurrentView(selectedCategory ? 'category' : (currentQuery ? 'search' : 'latest'));
      }
    }
    // Other routes like /upload, /account, /contact are just showing placeholder pages
    // and don't need data fetching in this useEffect.
  }, [location.pathname]); // React to path changes

  const fetchLatestRouteData = async (page) => {
    setIsLoading(true);
    setCurrentQuery('');
    setSelectedCategory('');
    // setCurrentView('latest'); // Set by useEffect or specific nav action
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

  const performSearch = async (query, page, isCategorySearch = false) => {
    setIsLoading(true);
    try {
      const response = await searchImages(query, page);
      setImages(response.results);
      setTotalPages(response.total_pages);
      if (isCategorySearch) {
        setSelectedCategory(query);
        setCurrentQuery('');
        setCurrentView('category');
      } else {
        setCurrentQuery(query);
        setSelectedCategory('');
        setCurrentView('search');
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (term) => {
    performSearch(term, 1, false);
  };

  const handleCategorySelect = async (category) => {
    console.log("Category selected in App.js:", category);
    performSearch(category, 1, true);
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      if (currentView === 'latest') {
        fetchLatestRouteData(nextPage);
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
        fetchLatestRouteData(prevPage);
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

  const MainContent = ({ currentView }) => (
    <>
      {currentView !== 'latest' && <SearchBar onSubmit={handleSubmit} />}
      {isLoading ? <p>Loading images...</p> : <ImageList images={images} onImageClick={handleImageClick} />}
      {images.length > 0 && !isLoading && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          {totalPages > 0 && (<span>Page {currentPage} of {totalPages}</span>)}
          <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
        </div>
      )}
    </>
  );

  return (
    <div className="app-layout">
      <ModernNavbar onSearchSubmit={handleSubmit} />
      <WallpaperCarousel images={carouselImages} />
      <div className="app-container">
        <ModernSidebar onSelectCategory={handleCategorySelect} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainContent currentView={currentView} />} />
            <Route path="/latest" element={<MainContent currentView={currentView} />} />
            <Route path="/top" element={<MainContent currentView={currentView} />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </main>
      </div>
      <ModernFooter />
      {isModalOpen && selectedModalImage && (
        <ImageModal image={selectedModalImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
