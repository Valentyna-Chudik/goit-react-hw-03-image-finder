export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
