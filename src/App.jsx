import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import { requestImg } from 'services/api';
import { ThreeCircles } from 'react-loader-spinner';
import css from './index.css';

export class App extends Component {
  state = {
    images: null,
    status: null,
    error: null,
    showModal: false,
    modalImg: null,
    query: '',
    page: 1,
    totalPages: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg();
    }
  }

  fetchImg = async () => {
    try {
      const images = await requestImg(this.state.query, this.state.page);
      const totalPages = Math.ceil(images.total / 12);
      const filteredData = images.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );
      this.setState(prevState => ({
        images: Array.isArray(prevState.images)
          ? [...prevState.images, ...filteredData]
          : filteredData,
        status: 'success',
        totalPages: totalPages,
      }));
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  onCloseModal = () => {
    this.setState(() => ({
      showModal: false,
      modalImg: null,
    }));
  };

  handleImageClick = largeImageURL => {
    const largeImg = this.state.images.filter(
      image => image.largeImageURL === largeImageURL
    )[0].largeImageURL;
    this.setState({ showModal: true, modalImg: largeImg });
  };

  handleSearchQuery = searchValue => {
    this.setState({
      images: null,
      query: searchValue,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  checkLastPage = () => {
    return (
      this.state.page === this.state.totalPages || this.state.images === null
    );
  };

  render() {
    return (
      <div className={css.app}>
        {this.state.status === 'pending' && <ThreeCircles />}
        <SearchBar handleSearchQuery={this.handleSearchQuery} />
        <ImageGallery
          images={this.state.images}
          handleImageClick={this.handleImageClick}
        />
        {this.state.showModal && (
          <Modal onClose={this.onCloseModal} largeImg={this.state.modalImg} />
        )}
        {this.state.images && this.state.images.length > 0 && (
          <Button
            checkLastPage={this.checkLastPage()}
            onClick={this.handleLoadMore}
          />
        )}
      </div>
    );
  }
}
