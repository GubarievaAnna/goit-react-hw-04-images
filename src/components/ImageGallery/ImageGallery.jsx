import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Button from '../Button/Button.jsx';
import Loader from '../Loader/Loader.jsx';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import s from './ImageGallery.module.css';

const ImageGallery = ({ keyWord }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = currentPage => {
    setIsLoadMore(false);
    setIsLoading(true);
    api(keyWord, currentPage)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setStatus('rejected');
          return;
        }
        setImages(prev => [...prev, ...hits]);
        setStatus('resolved');
        Math.ceil(totalHits / 12) === page
          ? setIsLoadMore(false)
          : setIsLoadMore(true);
      })
      .catch(error => {
        setStatus('error');
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (keyWord === '') return;
    setPage(1);
    setStatus('');
    setImages([]);
    fetchPhotos(1);
  }, [keyWord]);

  useEffect(() => {
    if (page === 1) return;
    fetchPhotos(page);
  }, [page]);

  const changePageQuery = () => setPage(prev => prev + 1);

  return (
    <>
      {status === 'rejected' && (
        <div className={s.rejected}>
          Sorry, there are no images matching your search query. Please try
          again.
        </div>
      )}
      {status === 'error' && <div className={s.error}> {error.message} </div>}
      {status === 'resolved' && (
        <ul className={s.gallery}>
          {images.map(el => (
            <ImageGalleryItem
              key={el.id}
              src={el.previewURL}
              alt={el.tags}
              srcModal={el.largeImageURL}
            />
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
      {isLoadMore && <Button onButtonClick={changePageQuery} />}
    </>
  );
};

ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default ImageGallery;
