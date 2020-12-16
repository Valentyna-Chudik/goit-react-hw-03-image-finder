import { Component } from 'react';

import imagesApi from '../../services/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import LoaderSpinner from '../Loader/Loader';

export default class GalleryView extends Component {
  state = {
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState(
        {
          currentPage: 1,
          images: [],
          error: null,
        },
        () => this.fetchImages(),
      );
    }
  }

  fetchImages = () => {
    const { currentPage } = this.state;
    const { query } = this.props;
    const options = { query, currentPage };

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
        <ImageGallery images={images} />
        {isLoading && <LoaderSpinner />}
        {shouldRenderLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}
