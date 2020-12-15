import { Component } from 'react';
import imagesApi from '../../services/images-api';

import Searchbar from '../Searchbar/Searchbar';

export default class GalleryView extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    imagesApi.fetchImages(options).then(images => {
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        currentPage: prevState.currentPage + 1,
      }));
    });
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
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
        {images.length > 0 && (
          <button type="button" onClick={this.fetchImages}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
