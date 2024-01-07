import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, handleImageClick }) => {
  return (
    <div className={css.ImageGalleryWrapper}>
      <ul className={css.ImageGallery}>
        {images &&
          images.map(image => (
            <ImageGalleryItem
              key={image.id}
              state={image}
              handleImageClick={() => handleImageClick(image.largeImageURL)}
            />
          ))}
      </ul>
    </div>
  );
};
