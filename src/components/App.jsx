import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';


import fetchImages from '../pixabayApi/pixabayApi';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    loadMore: false,
    largeImage: '',
    error: null,
  };

  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }

  
  onChangeQuery = query => {

    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  
  };
  


  getImages = async () => {
    
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));
      
      if (hits.length === 12) {
        this.setState({ loadMore: true });
      };

      if (hits.length !== 12) {
        this.setState({ loadMore: false });
      };

    } catch (error) {
        console.log('Smth wrong with App fetch', error);
        this.setState({ error });
    } finally {
        this.setState({
        isLoading: false,
      });
    }
  };


  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };


  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImage: '',
    }));
  };

  onClickSwipeImg = () => {
    const clickedImg = this.state.largeImage;
    const index = this.state.images.findIndex(el => el.largeImageURL === clickedImg);
    
    if (index === (this.state.images.length - 1)) {
      return this.setState({ largeImage: this.state.images[0].largeImageURL });   
    }

    this.setState({ largeImage: this.state.images[index + 1].largeImageURL });   
  }

  render() {
    const { images, loadMore, isLoading, showModal, largeImage, error } = this.state;
    
    return (
      <>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ToastContainer autoClose={3000} />

        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />

        {loadMore && <Button onClick={this.getImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" className="Modal-image" onClick={this.onClickSwipeImg}/>
          </Modal>
        )}

        {isLoading && <Loader />}

        {error && (
          <>
            <p>
              Sorry, something went wrong. Please try again, or{' '}
              <a href="/">refresh the page</a>.
            </p>
          </>
        )}
      </>
    );
  }
}

export default App;