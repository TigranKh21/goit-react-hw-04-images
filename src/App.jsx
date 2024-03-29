import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { requestImg } from 'services/api';
import { ThreeCircles } from 'react-loader-spinner';
import css from './index.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      const fetchImg = async () => {
        try {
          const imagesData = await requestImg(query, page);
          const totalPages = Math.ceil(imagesData.total / 12);
          const filteredData = imagesData.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          setImages(prevState => [...prevState, ...filteredData]);
          setStatus('success');
          setTotalPages(totalPages);
        } catch (error) {
          setError(error.message);
          setStatus('error');
        }
      };

      fetchImg();
    }
  }, [query, page]);

  const onCloseModal = () => {
    setShowModal(false);
    setModalImg(null);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImg(largeImageURL);
  };

  const handleSearchQuery = searchValue => {
    setImages([]);
    setQuery(searchValue);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const checkLastPage = () => {
    return page === totalPages || images === null;
  };

  return (
    <div className={css.app}>
      {status === 'pending' && <ThreeCircles />}
      <SearchBar handleSearchQuery={handleSearchQuery} />
      <ImageGallery images={images} handleImageClick={handleImageClick} />
      {showModal && <Modal onClose={onCloseModal} largeImg={modalImg} />}
      {images && images.length > 0 && (
        <Button checkLastPage={checkLastPage()} onClick={handleLoadMore} />
      )}
    </div>
  );
};
