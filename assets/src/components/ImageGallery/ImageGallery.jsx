import React from "react";
import css from "./ImageGallery.module.css"
import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery =({pictures, onModal}) => {
    return(
        <ul className={css.ImageGallery}>
            {pictures.map(({ id, webformatURL }, index) => (
            <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            index={index}
            onModal={onModal}
            />
      ))}
        </ul>
    )
}
ImageGallery.propTypes={
    onModal: PropTypes.func.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
      }))
}