import React, a
import './WallpaperCarousel.css';

const WallpaperCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="wallpaper-carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.urls.full} alt={image.alt_description} />
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrevious}>&#10094;</button>
      <button className="carousel-control next" onClick={goToNext}>&#10095;</button>
    </div>
  );
};

export default WallpaperCarousel;
