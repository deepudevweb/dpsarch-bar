import React from 'react';
// This component would likely take category name as a prop or from URL params
function CategoriesResultsPage({ categoryName }) {
  return (
    <div>
      <h2>{categoryName ? categoryName : 'Category'} Wallpapers</h2>
      {/* ImageList would be rendered here, filtered by category */}
      <p>Images for {categoryName ? categoryName : 'the selected category'} will be displayed here.</p>
    </div>
  );
}
export default CategoriesResultsPage;
