import { Component } from 'react';

import imagesApi from '../../services/images-api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import LoaderSpinner from '../Loader/Loader';

export default class GalleryView extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
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
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadMore = () => {
    this.fetchImages();
    this.scrollPage();
  };

  scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, error } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div>
        {error && <h1>Something went wrong</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} />
        {isLoading && <LoaderSpinner />}
        {shouldRenderLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}
