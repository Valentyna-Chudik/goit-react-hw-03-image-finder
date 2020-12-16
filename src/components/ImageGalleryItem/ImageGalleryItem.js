import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        className={styles.imageGalleryItemImage}
      />
    </li>
  );
}
