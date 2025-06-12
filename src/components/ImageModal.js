// src/components/ImageModal.js
import React from 'react';
import axios from 'axios'; // Still used for download_location ping
import './ImageModal.css';

function ImageModal({ image, onClose }) {
  if (!image) {
    return null;
  }

  const resolutions = [
    // ... (resolution definitions remain the same) ...
    { label: '1600x900', width: 1600, height: 900, type: 'crop' },
    { label: '1920x1080 (Full HD)', width: 1920, height: 1080, type: 'crop' },
    { label: '2560x1440 (QHD)', width: 2560, height: 1440, type: 'crop' },
    { label: '3840x2160 (4K)', width: 3840, height: 2160, type: 'crop' },
    { label: `Original (${image.width}x${image.height})`, url: image.urls.full, original: true }
  ];

  const handleDownload = async (resolution) => {
    let filename = `${image.alt_description || image.id || 'wallpaper'}`;
    let constructedImageUrl = '';

    if (resolution.original) {
      constructedImageUrl = resolution.url;
      filename += `_original.jpg`;
    } else {
      constructedImageUrl = `${image.urls.raw}&w=${resolution.width}&h=${resolution.height}&fit=${resolution.type}&fm=jpg&q=80`;
      filename += `_${resolution.width}x${resolution.height}.jpg`;
    }

    try {
      // 1. Ping the download_location for Unsplash tracking (mandatory)
      await axios.get(image.links.download_location, {
        headers: {
          Authorization: `Client-ID 8O50V7bNzfKdVixwS9W9nZVdr0VnrCv9gmeimfdvp6Y`, // Replace with your Access Key
        },
      });

      // 2. Fetch the image data as a blob
      //    Important: For Imgix URLs (like those from image.urls.raw),
      //    they generally have permissive CORS headers (Access-Control-Allow-Origin: *),
      //    so fetching them client-side should be possible.
      const imageResponse = await fetch(constructedImageUrl);
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
      }
      const blob = await imageResponse.blob();

      // 3. Create an object URL from the blob
      const objectUrl = URL.createObjectURL(blob);

      // 4. Trigger download using an anchor tag
      const link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Revoke the object URL to free up resources
      URL.revokeObjectURL(objectUrl);

    } catch (error) {
      console.error('Error processing download:', error);
      // Fallback: If fetch/blob method fails, try opening the constructed URL directly.
      // This might still open in a new tab for the user, but it's better than a silent failure.
      // The original error handling already had a window.open, so this is similar.
      alert("Download failed to start automatically. Your browser might try to open the image in a new tab. You can save it from there.");
      window.open(constructedImageUrl, '_blank');
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // ... (JSX for modal structure remains the same) ...
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={handleModalContentClick}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">&times;</button>
        <img src={image.urls.regular} alt={image.alt_description || 'Wallpaper preview'} className="modal-image-preview" />
        <div className="modal-actions">
          <p className="modal-image-title">{image.alt_description || image.description || "Untitled Wallpaper"}</p>
          {/* Re-added original resolution display from previous working version, as it was missing in the plan's JSX but present in logic */}
          <p className="modal-image-resolution">Original Resolution: {image.width}x{image.height}</p>
          <div className="resolution-options">
            <p className="resolution-label">Download options:</p>
            {resolutions.map((res) => (
              <button
                key={res.label}
                onClick={() => handleDownload(res)}
                  className="btn btn-secondary resolution-button" // Added base btn classes
              >
                {res.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
