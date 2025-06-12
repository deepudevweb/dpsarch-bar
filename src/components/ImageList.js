import './ImageList.css'
import ImageShow from './ImageShow';

// Add onImageClick to props
function ImageList({ images, onImageClick }) {
    const renderedImages = images.map((image) =>{
       // Pass onImageClick to each ImageShow/ImageCard
       return <ImageShow key={image.id} image={image} onImageClick={onImageClick} />
    });
    return <div className='image-list'>{renderedImages}</div>
};

export default ImageList;