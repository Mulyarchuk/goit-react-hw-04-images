import React from "react";
import css from "./Searchbar.module.css";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


export class Searchbar extends React.Component{
 state={
    searchQuery: ``,
    };

static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };
    
handleSubmit=e=>{
e.preventDefault();
if(this.state.searchQuery.trim()===``){
    toast.error(`Put the search`);
    return;
}
this.props.onSubmit(this.state.searchQuery)
this.setState({searchQuery:``})
};

handleChangeName =e=>{
    this.setState({searchQuery: e.currentTarget.value.toLowerCase()})
};

render(){
    return (
    <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchButton}>
            <span className={css.SearchLabel}>Search</span>
            </button>

            <input
            className={css.SearchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.searchQuery}
            onChange={this.handleChangeName}
            />
        </form>
    </header>
   ) }
}