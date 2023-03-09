import { useEffect } from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal ({toggleModal,largeImage }) {
    useEffect(()=>{
      const handleKeyDown = e => {
        e.code === 'Escape' && toggleModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [toggleModal])
    
    
    
      const handleBackdropClick = e => {
        e.currentTarget === e.target && toggleModal();
      };
     
    
    return(
    <div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal}>
      <img src={largeImage} alt="" />
    </div>
  </div>)
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};