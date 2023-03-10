import  { useState, useEffect } from "react";
import { getPictures } from "API/API";
import  Searchbar  from "./Searchbar/Searchbar";
import css from "./App.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';
import { Loader } from "./Loader/Loader";
import  Modal  from "./Modal/Modal";
import { Button } from "./Button/Button";

export default function App () {
  
    const [searchQuery, setSearchQuery] =useState(``);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage]= useState(0);
    const [showModal, setShowModal]  = useState(false);
    const [largeImage, setLargeImage]=useState(``);
    const [, setError]  = useState(null);
  
    useEffect(() => {
      if (!page) {
        return;
      }
  
      try {
        setIsLoading(true);
        const response = getPictures(searchQuery, page);
        response.then(data => {
          if(data.data.hits.length === 0){
             toast.error('Nothing found');
             return;
          }
          const NewImages = data.data.hits.map(({id,webformatURL,largeImageURL})=>(
          {id, webformatURL,largeImageURL}
          ));
          setImages(i=>[...i,...NewImages,]);
          
        });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      } finally{
        setIsLoading(false);
      }
    }, [page, searchQuery]);
  


  const onSubmit = newSearchQuery => {
    if (newSearchQuery.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchQuery === searchQuery) {
      return;
    }
    
      setSearchQuery(newSearchQuery); 
      setPage(1);
      setImages([]);
    };
  

const onClick = index => {
  
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  
};

const toggleModal=()=>{
  setShowModal(!showModal);
}

const nextPage = () => {
  setPage(page=>page+1);
};

  
   
   return <div className={css.app}>
    <ToastContainer position="top-right" autoClose={3000}/>
    <Searchbar onSubmit={onSubmit}/>
    {images.length !== 0 && <ImageGallery pictures={images} onModal={onClick}/>}
    {isLoading && <Loader/>}
    {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage}/>}
    {images.length >= 12 && <Button nextPage={nextPage} />}
    </div>;
  
};
