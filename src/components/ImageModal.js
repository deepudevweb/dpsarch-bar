// src/components/ImageModal.js
import React from 'react';
import axios from 'axios';
import './ImageModal.css';

function ImageModal({ image, onClose }) {
  if (!image) {
    return null; // Don't render if no image is selected
  }

  const resolutions = [
    { label: '1600x900', width: 1600, height: 900, type: 'crop' },
    { label: '1920x1080 (Full HD)', width: 1920, height: 1080, type: 'crop' },
    { label: '2560x1440 (QHD)', width: 2560, height: 1440, type: 'crop' },
    { label: '3840x2160 (4K)', width: 3840, height: 2160, type: 'crop' },
    { label: `Original (${image.width}x${image.height})`, url: image.urls.full, original: true }
  ];

  const handleDownload = async (resolution) => {
    try {
      // Always ping the official download location for tracking
      await axios.get(image.links.download_location, {
        headers: {
          Authorization: `Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y`, // Replace with your Access Key
        },
      });

      let downloadUrl = '';
      let filename = `${image.alt_description || image.id || 'wallpaper'}`;

      if (resolution.original) {
        downloadUrl = resolution.url;
        filename += `_original.jpg`;
      } else {
        // Construct URL using image.urls.raw and Imgix params
        // Example: &w=1920&h=1080&fit=crop&fm=jpg&q=80
        downloadUrl = `${image.urls.raw}&w=${resolution.width}&h=${resolution.height}&fit=${resolution.type}&fm=jpg&q=80`;
        filename += `_${resolution.width}x${resolution.height}.jpg`;
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error processing download:', error);
      // Fallback: try to download the 'full' version directly if something went wrong
      // or if it's an original download that failed for other reasons.
      const fallbackUrl = resolution.original ? resolution.url : image.urls.full;
      const fallbackFilename = `${image.alt_description || image.id || 'wallpaper'}_fallback.jpg`;

      if (error.response && error.response.status !== 403) { // Avoid fallback if it's an auth issue for ping
         const link = document.createElement('a');
         link.href = fallbackUrl;
         link.setAttribute('download', fallbackFilename);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } else if (!error.response) { // Network error or other issue
         const link = document.createElement('a');
         link.href = fallbackUrl;
         link.setAttribute('download', fallbackFilename);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">&times;</button>
        <img src={image.urls.regular} alt={image.alt_description || 'Wallpaper preview'} className="modal-image-preview" />
        <div className="modal-actions">
          <p className="modal-image-title">{image.alt_description || image.description || "Untitled Wallpaper"}</p>
          {/* Kept original resolution display as per plan */}
          <p className="modal-image-resolution">Original Resolution: {image.width}x{image.height}</p>
          <div className="resolution-options">
            <p className="resolution-label">Download options:</p>
            {resolutions.map((res) => {
              // Optionally, filter out resolutions larger than the original image
              if (!res.original && (res.width > image.width || res.height > image.height) && res.type === 'crop') {
                // If cropping, and requested size is larger than original, it might upscale or behave unexpectedly.
                // For 'fit=max', larger sizes are fine as it won't upscale.
                // For simplicity here, we can show all, or filter. Let's show all for now.
              }
              return (
                <button
                  key={res.label}
                  onClick={() => handleDownload(res)}
                  className="resolution-button"
                >
                  {res.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
