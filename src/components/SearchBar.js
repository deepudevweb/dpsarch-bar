// src/components/SearchBar.js
import './SearchBar.css';
import { useState } from 'react';

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div className="search-bar-container"> {/* Changed class for overall container */}
      <form className="search-bar-form" onSubmit={handleFormSubmit}>
        {/* Original label can be kept or removed based on new design preference */}
        {/* <label>Enter to search images</label> */}
        <input
          value={term}
          onChange={handleChange}
          placeholder="Enter to search images" // Ensure placeholder
        />
        <button type="submit" className="search-button">
          <span role="img" aria-label="search">🔍</span> {/* Search icon */}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
