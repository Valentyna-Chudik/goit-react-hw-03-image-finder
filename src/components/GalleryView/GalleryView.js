import { Component } from 'react';
import { toast } from 'react-toastify';

import imagesApi from '../../services/images-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import LoaderSpinner from '../Loader/Loader';
import Section from '../Section/Section';
import Modal from '../Modal/Modal';

export default class GalleryView extends Component {
  state = {
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    alt: '',
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
        if (images.length === 0) {
          toast.error(' Nothing was found');
          return;
        }
      })

      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }), this.scrollPage());
  };

  onLoadMore = () => {
    this.fetchImages();
    this.scrollPage();
  };

  scrollPage = () => {
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 500);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({
      largeImageURL: e.target.dataset.source,
      alt: e.target.alt,
    });

    this.toggleModal();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, alt } = this.state;
    const shouldRenderLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div>
        <ImageGallery images={images} onClick={this.onOpenModal} />
        {showModal && (
          <Modal
            largeImgURL={largeImageURL}
            alt={alt}
            onClose={this.toggleModal}
          />
        )}
        {isLoading && <LoaderSpinner />}
        <Section>
          {shouldRenderLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
        </Section>
      </div>
    );
  }
}
