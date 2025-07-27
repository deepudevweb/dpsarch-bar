import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { FaDownload, FaExpand, FaHeart, FaEye } from 'react-icons/fa';
import { getRandomImages, downloadImage } from '../api';
import './HeroCarousel.css';

const HeroCarousel = ({ onImageClick }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      draggable: true
    },
    [autoplay]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const randomImages = await getRandomImages(8, true);
        setImages(randomImages);
      } catch (error) {
        console.error('Error fetching hero images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  const handleDownload = async (image, e) => {
    e.stopPropagation();
    try {
      const filename = `dp-wallpaper-${image.id}.jpg`;
      await downloadImage(image.urls.full, filename);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="hero-carousel-loading">
        <div className="loading-spinner"></div>
        <p>Loading beautiful wallpapers...</p>
      </div>
    );
  }

  return (
    <section className="hero-carousel-section">
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Discover Amazing
            <span className="gradient-text"> Wallpapers</span>
          </h1>
          <p className="hero-subtitle">
            High-quality wallpapers for every device. Download stunning images 
            that bring your screens to life.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Wallpapers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4K</span>
              <span className="stat-label">Quality</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Free</span>
              <span className="stat-label">Downloads</span>
            </div>
          </div>
        </motion.div>

        <div className="hero-carousel-container">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {images.map((image, index) => (
                <div key={image.id} className="embla__slide">
                  <motion.div
                    className="carousel-slide"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="image-container">
                      <img
                        src={image.urls.regular}
                        alt={image.alt_description || 'Beautiful wallpaper'}
                        className="carousel-image"
                        loading="lazy"
                      />
                      
                      <div className="image-overlay">
                        <div className="image-info">
                          <div className="image-stats">
                            <div className="stat">
                              <FaHeart />
                              <span>{formatNumber(image.likes)}</span>
                            </div>
                            <div className="stat">
                              <FaDownload />
                              <span>{formatNumber(image.downloads || 0)}</span>
                            </div>
                          </div>
                          
                          <div className="image-actions">
                            <motion.button
                              className="action-btn view-btn"
                              onClick={() => onImageClick(image)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaExpand />
                            </motion.button>
                            
                            <motion.button
                              className="action-btn download-btn"
                              onClick={(e) => handleDownload(image, e)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaDownload />
                            </motion.button>
                          </div>
                        </div>
                        
                        {image.user && (
                          <div className="photographer-info">
                            <img
                              src={image.user.profile_image?.small}
                              alt={image.user.name}
                              className="photographer-avatar"
                            />
                            <div className="photographer-details">
                              <span className="photographer-name">{image.user.name}</span>
                              <span className="photographer-username">@{image.user.username}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === selectedIndex ? 'active' : ''}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};

export default HeroCarousel;