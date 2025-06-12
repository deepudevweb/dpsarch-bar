import React from 'react';
import './CategorySidebar.css';

function CategorySidebar({ onSelectCategory }) { // Added onSelectCategory prop
  const categories = [
    "Nature", "Animals", "Movies", "Cars",
    "Girls", "Funny", "Travel", "Seasons"
  ];

  const handleCategoryClick = (category) => {
    console.log("Selected category:", category);
    if (onSelectCategory) {
      onSelectCategory(category); // Call the prop function if provided
    }
  };

  return (
    <aside className="category-sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            className="category-item"
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
