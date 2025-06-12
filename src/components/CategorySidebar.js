import React from 'react';
import './CategorySidebar.css';

// Add activeCategory to props
function CategorySidebar({ onSelectCategory, activeCategory }) {
  const categories = [
    "Nature", "Animals", "Movies", "Cars",
    "Girls", "Funny", "Travel", "Seasons"
    // Add more or fetch dynamically in a real app
  ];

  const handleCategoryClick = (category) => {
    // console.log("Selected category:", category); // Keep for debugging if needed
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <aside className="category-sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            // Apply 'active-category' class if current category matches activeCategory prop
            className={`category-item ${category === activeCategory ? 'active-category' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategorySidebar;
