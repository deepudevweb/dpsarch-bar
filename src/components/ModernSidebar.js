import React from 'react';
import './ModernSidebar.css';

function ModernSidebar({ onSelectCategory }) {
  const categories = [
    "Nature", "Animals", "Movies", "Cars",
    "Girls", "Funny", "Travel", "Seasons"
  ];

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <aside className="modern-sidebar">
      <h3>Categories</h3>
      <ul className="modern-sidebar-list">
        {categories.map((category) => (
          <li
            key={category}
            className="modern-sidebar-item"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ModernSidebar;
