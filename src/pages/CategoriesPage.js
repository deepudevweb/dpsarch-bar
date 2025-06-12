import React from 'react';
// Optionally import Link if you want to link to specific categories from here
// import { Link } from 'react-router-dom';

function CategoriesPage() {
  // Example categories - these could be fetched or dynamic later
  const categories = ["Nature", "Animals", "Movies", "Cars", "Girls", "Funny", "Travel", "Seasons"];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Explore Categories</h2>
      <p>Find wallpapers based on your favorite categories.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {categories.map(cat => (
          // Currently, clicking these won't do anything as they are just text.
          // To make them functional like the sidebar, you'd need to call a similar
          // function to handleCategorySelect or navigate to a category-specific URL.
          // For now, they are just displayed.
          <span key={cat} style={{ padding: '10px 15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            {cat}
          </span>
        ))}
      </div>
      {/* <p style={{ marginTop: '30px' }}>Alternatively, use the sidebar to navigate categories directly.</p> */}
    </div>
  );
}

export default CategoriesPage;
