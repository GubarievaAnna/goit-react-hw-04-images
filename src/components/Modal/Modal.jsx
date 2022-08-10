import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const container = document.getElementById('modal');

const Modal = ({ src, alt, onModalClose }) => {
  const onBackdropClick = e => {
    if (e.currentTarget === e.target) onModalClose();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onModalClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    container
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
