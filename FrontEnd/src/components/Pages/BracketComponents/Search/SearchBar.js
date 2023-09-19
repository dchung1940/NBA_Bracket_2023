import React from 'react';
import "./style/SearchBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function SearchBar(props){

    function changeHandler(event){
        props.setSearch(event.target.value);
    }

return(
    <div className = "search">
        <FontAwesomeIcon className = "icon" icon={faSearch} />
        <input type = "text" placeholder = "Search..." onChange = {changeHandler}/>
    </div>
)

}

export default SearchBar;
