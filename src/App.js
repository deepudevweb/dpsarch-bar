import { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import searchImages from './api';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSubmit = async (term) => {
    setCurrentQuery(term);
    setCurrentPage(1);
    const response = await searchImages(term, 1);

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

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {/* <button onClick={() => handleSubmit()}>search</button> */}
      <ImageList images={images} />
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
      <Footer />
    </div>
  );
}

export default App;
