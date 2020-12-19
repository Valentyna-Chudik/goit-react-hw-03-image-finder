import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  alt,
  onClick,
}) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        data-source={largeImageURL}
        alt={alt}
        onClick={onClick}
        className={styles.imageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
