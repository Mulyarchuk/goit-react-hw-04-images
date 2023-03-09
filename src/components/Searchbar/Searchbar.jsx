import {useState} from "react";
import css from "./Searchbar.module.css";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


export default function Searchbar ({onSubmit}){
 
    const [searchQuery, setSearchQuery] = useState(``)
    


    
const handleSubmit=e=>{
e.preventDefault();
if(searchQuery.trim()===``){
    toast.error(`Put the search`);
    return;
}
onSubmit(searchQuery);
setSearchQuery(``);
};

const handleChangeName =e=>{
    setSearchQuery(e.currentTarget.value.toLowerCase())
};


    return (
    <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={css.SearchButton}>
            <span className={css.SearchLabel}>Search</span>
            </button>

            <input
            className={css.SearchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {searchQuery}
            onChange={handleChangeName}
            />
        </form>
    </header>
   ) }


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };