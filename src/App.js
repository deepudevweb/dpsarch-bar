import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import searchImages from './api';
// import Footer from './components/Footer';
import './App.css';
import Navbar from './components/Navbar';
import CategorySidebar from './components/CategorySidebar'; // Import new component
import NewFooter from './components/NewFooter';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // New state

  const handleSubmit = async (term) => {
    // Potentially modify to include category later
    setCurrentQuery(term);
    setSelectedCategory(''); // Reset category on new search term
    setCurrentPage(1);
    const response = await searchImages(term, 1); // Category not yet included in API call

    setImages(response.results);
    setTotalPages(response.total_pages);
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const response = await searchImages(currentQuery, nextPage);
      setImages(response.results);
      setCurrentPage(nextPage);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const response = await searchImages(currentQuery, prevPage);
      setImages(response.results);
      setCurrentPage(prevPage);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentQuery(''); // Reset search term on new category
    setCurrentPage(1);
    // For now, this won't fetch images by category, that's a later step.
    // We'll just log it. In a future step, we'd call searchImages here.
    console.log("Category selected in App.js:", category);
    // Example of future call:
    // const response = await searchImages(category, 1); // Using category as search term
    // setImages(response.results);
    // setTotalPages(response.total_pages);
    setImages([]); // Clear images for now when category is selected
    setTotalPages(0);
  };

  const handleImageClick = (image) => {
    console.log("Image clicked in App.js, received image object:", image);
    // Later: setSelectedModalImage(image); setModalOpen(true);
  };

  return (
    <div className="app-layout"> {/* Renamed outer div for clarity, or use React.Fragment and style body/root */}
      <Navbar />
      <div className="app-container"> {/* New container for sidebar + main content */}
        <CategorySidebar onSelectCategory={handleCategorySelect} />
        <main className="main-content"> {/* Main content area */}
          <SearchBar onSubmit={handleSubmit} />
          <ImageList images={images} onImageClick={handleImageClick} />
          {images.length > 0 && (
            <div className="pagination-controls">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              {totalPages > 0 && (
                <span>
                  Page {currentPage} of {totalPages}
                </span>
              )}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
      <NewFooter /> {/* This is still the old footer, will be replaced by NewFooter later */}
    </div>
  );
}

export default App;
