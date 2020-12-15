import { Component } from 'react';
import axios from 'axios';

// 19042677-37d14c32a93614679ae39c658
export default class GalleryView extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    axios
      .get(
        'https://pixabay.com/api/?q=dog&page=1&key=19042677-37d14c32a93614679ae39c658&image_type=photo&orientation=horizontal&per_page=12',
      )
      .then(response => {
        this.setState({ images: response.data.hits });
      });
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <ul>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <li key={id}>
              <img
                src={webformatURL}
                data-source={largeImageURL}
                alt={tags}
              ></img>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
