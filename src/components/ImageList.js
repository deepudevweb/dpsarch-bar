import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaExpand, FaHeart, FaEye, FaUser, FaCamera } from 'react-icons/fa';
import { downloadImage } from '../api';
import toast, { Toaster } from 'react-hot-toast';
import './ImageList.css';

const ImageList = ({ images, onImageClick, loading }) => {
  const [downloadingIds, setDownloadingIds] = useState(new Set());
  const [likedImages, setLikedImages] = useState(new Set());

  const handleDownload = useCallback(async (image, event) => {
    event.stopPropagation();
    
    if (downloadingIds.has(image.id)) return;
    
    setDownloadingIds(prev => new Set(prev).add(image.id));
    
    try {
      const filename = `dp-wallpaper-${image.id}-${image.width}x${image.height}.jpg`;
      await downloadImage(image.urls.full, filename);
      toast.success(`Downloaded: ${filename}`, {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: '600'
        }
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.', {
        duration: 3000,
        position: 'bottom-right'
      });
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(image.id);
        return newSet;
      });
    }
  }, [downloadingIds]);

  const handleLike = useCallback((imageId, event) => {
    event.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
        toast('Removed from favorites', { 
          icon: '💔',
          duration: 2000,
          position: 'bottom-right'
        });
      } else {
        newSet.add(imageId);
        toast('Added to favorites', { 
          icon: '❤️',
          duration: 2000,
          position: 'bottom-right'
        });
      }
      return newSet;
    });
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getResolutionQuality = (width, height) => {
    const pixels = width * height;
    if (pixels >= 8000000) return { label: '4K+', class: 'ultra' };
    if (pixels >= 2000000) return { label: '2K+', class: 'high' };
    if (pixels >= 1000000) return { label: 'HD+', class: 'medium' };
    return { label: 'SD', class: 'low' };
  };

  if (loading) {
    return (
      <div className="image-list-loading">
        <div className="loading-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="loading-card">
              <div className="loading-image"></div>
              <div className="loading-content">
                <div className="loading-line long"></div>
                <div className="loading-line short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🖼️</div>
        <h3>No wallpapers found</h3>
        <p>Try searching for something else or browse our categories.</p>
      </div>
    );
  }

  return (
    <div className="image-list-container">
      <Toaster />
      <motion.div 
        className="image-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {images.map((image, index) => {
            const quality = getResolutionQuality(image.width, image.height);
            const isDownloading = downloadingIds.has(image.id);
            const isLiked = likedImages.has(image.id);

            return (
              <motion.div
                key={image.id}
                className="image-card"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onImageClick(image)}
              >
                <div className="image-wrapper">
                  <img
                    src={image.urls.small}
                    alt={image.alt_description || 'Beautiful wallpaper'}
                    className="wallpaper-image"
                    loading="lazy"
                  />
                  
                  {/* Quality Badge */}
                  <div className={`quality-badge ${quality.class}`}>
                    {quality.label}
                  </div>

                  {/* Image Overlay */}
                  <div className="image-overlay">
                    {/* Top Actions */}
                    <div className="overlay-top">
                      <div className="image-stats">
                        <div className="stat">
                          <FaHeart className={isLiked ? 'liked' : ''} />
                          <span>{formatNumber(image.likes)}</span>
                        </div>
                        <div className="stat">
                          <FaEye />
                          <span>{formatNumber(image.views || 0)}</span>
                        </div>
                      </div>
                      
                      <motion.button
                        className={`like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={(e) => handleLike(image.id, e)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaHeart />
                      </motion.button>
                    </div>

                    {/* Bottom Actions */}
                    <div className="overlay-bottom">
                      <div className="image-info">
                        <div className="resolution">
                          {image.width} × {image.height}
                        </div>
                        {image.user && (
                          <div className="photographer">
                            <FaCamera />
                            <span>{image.user.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="action-buttons">
                        <motion.button
                          className="action-btn view-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onImageClick(image);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="View Fullscreen"
                        >
                          <FaExpand />
                        </motion.button>
                        
                        <motion.button
                          className={`action-btn download-btn ${isDownloading ? 'downloading' : ''}`}
                          onClick={(e) => handleDownload(image, e)}
                          disabled={isDownloading}
                          whileHover={{ scale: isDownloading ? 1 : 1.05 }}
                          whileTap={{ scale: isDownloading ? 1 : 0.95 }}
                          title="Download Wallpaper"
                        >
                          {isDownloading ? (
                            <div className="download-spinner"></div>
                          ) : (
                            <FaDownload />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <div className="footer-left">
                    {image.user && (
                      <div className="user-info">
                        <img
                          src={image.user.profile_image?.small}
                          alt={image.user.name}
                          className="user-avatar"
                        />
                        <div className="user-details">
                          <span className="user-name">{image.user.name}</span>
                          <span className="user-username">@{image.user.username}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="footer-right">
                    <div className="download-count">
                      <FaDownload />
                      <span>{formatNumber(image.downloads || 0)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ImageList;