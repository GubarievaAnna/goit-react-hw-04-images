import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal.jsx';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, srcModal }) => {
  const [isModal, setIsModal] = useState(false);

  const onModalOpen = () => setIsModal(true);

  const onModalClose = () => setIsModal(false);

  return (
    <>
      <li className={s.item}>
        <img src={src} alt={alt} className={s.image} onClick={onModalOpen} />
      </li>
      {isModal && (
        <Modal src={srcModal} alt={alt} onModalClose={onModalClose} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcModal: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
