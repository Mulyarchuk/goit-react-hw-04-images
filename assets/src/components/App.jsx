import React from "react";
import { getPictures } from "API/API";
import { Searchbar } from "./Searchbar/Searchbar";
import css from "./App.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";

export  class App extends React.Component {
  state ={
    searchQuery: ``,
    images: [],
    isLoading: false,
    page: 0,
    showModal: false,
    largeImage:'',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchQuery = prevState.searchQuery;
    const { searchQuery, page, images } = this.state;
    if (prevPage !== page || prevSearchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true });
        const response = getPictures(searchQuery, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Nothing found')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } 
    }
  }


  onSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (searchQuery === this.state.searchQuery) {
      return;
    }
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      images: [],
    });
  };

onClick = index => {
  this.setState(({ images }) => ({
    showModal: true,
    largeImage: images[index].largeImageURL,
  }));
};

toggleModal=()=>{
  this.setState(({showModal})=>({showModal: !showModal}))
}

nextPage = () => {
  this.setState(({ page }) => ({ page: page + 1 }));
};

  render(){
   const {images, showModal, isLoading, largeImage} = this.state;
   return <div className={css.app}>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Searchbar onSubmit={this.onSubmit}/>
    {images.length !== 0 && <ImageGallery pictures={images} onModal={this.onClick}/>}
    {isLoading && <Loader/>}
    {showModal && <Modal toggleModal={this.toggleModal} largeImage={largeImage}/>}
    {images.length >= 12 && <Button nextPage={this.nextPage} />}
    </div>;
  };
};
