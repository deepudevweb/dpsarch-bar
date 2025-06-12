// src/components/ImageShow.js
import React from 'react';
import axios from 'axios';
// We'll assume ImageList.css will contain styles for .image-card
// If ImageShow had its own CSS, import it here. Let's assume ImageList.css for now.
// import './ImageShow.css'; // If it existed

// Prop 'onImageClick' will be added later when integrating modal
function ImageShow({ image, onImageClick }) {
  const handleDownload = async () => {
    try {
      // Ping download location
      await axios.get(image.links.download_location, {
        headers: {
          Authorization: 'Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y',
        },
      });

      // Create temporary link to trigger download
      const link = document.createElement('a');
      link.href = image.urls.full; // Or image.links.download for API-provided filename
      link.setAttribute('download', `${image.alt_description || image.id}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback or user notification if needed
      // For example, try to open the download link directly if ping fails but user should still get image
      if (error.response && error.response.status !== 403) { // Avoid fallback if it's an auth issue for ping
         window.open(image.links.download, '_blank');
      } else if (!error.response) { // Network error or other issue
         window.open(image.links.download, '_blank');
      }
    }
  };

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
      <button onClick={(e) => { e.stopPropagation(); handleDownload(); }} className="download-button-card">
        Download {/* Keep button distinct, maybe style it differently */}
      </button>
    </div>
  );
}

export default ImageShow;