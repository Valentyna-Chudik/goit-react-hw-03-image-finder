import { Component } from 'react';
import Loader from 'react-loader-spinner';
import imagesApi from '../../services/images-api';

import Searchbar from '../Searchbar/Searchbar';

export default class GalleryView extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
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

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

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
        {isLoading && (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        )}
        {shouldRenderLoadMoreBtn && (
          <button type="button" onClick={this.fetchImages}>
            Load more
          </button>
        )}
      </div>
    );
  }
}
