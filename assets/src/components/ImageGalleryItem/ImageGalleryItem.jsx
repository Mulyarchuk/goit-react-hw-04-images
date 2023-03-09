import React from "react";
import css from "./ImageGalleryItem.module.css";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({webformatURL, index, onModal})=>{
return <li className={css.ImageGalleryItem} onClick={() => onModal(index)}>
  <img src={webformatURL} alt="" className={css.ImageGalleryImage}/>
</li>
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onModal: PropTypes.func.isRequired,
  };