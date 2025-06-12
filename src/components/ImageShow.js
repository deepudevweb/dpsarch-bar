// src/components/ImageShow.js
import React from 'react';
// No more axios import if handleDownload is removed

function ImageShow({ image, onImageClick }) {
  const handleCardClick = () => {
    if (onImageClick) {
      onImageClick(image); // Pass the whole image object for modal
    } else {
      console.log("Image card clicked, but no onImageClick handler provided. Image ID:", image.id);
    }
  };

  return (
    <div className="image-card" onClick={handleCardClick}>
      <img src={image.urls.small} alt={image.alt_description || 'Search result'} className="image-thumbnail" />
      <div className="image-info">
        <p className="image-title">{image.alt_description || image.description || 'Untitled'}</p>
        <p className="image-resolution">{image.width}x{image.height}</p>
      </div>
      {/* Download button removed from here */}
    </div>
  );
}

export default ImageShow;