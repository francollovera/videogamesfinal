import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getVideogamesname, set_Currents_Page } from "../../redux/actions";
import { useState } from "react";

import style from './Searchbar.module.css';


export default function SearchBar(props){
  // estado para borrar todo y para recibir los cambios
    const [value, setValue]= useState('');
    
    const dispatch = useDispatch();

    const videogames = useSelector((state) => state.videogames);
    const videogamesbyname = useSelector((state) => state.videogamesbyname);
    // const setCurrentPage = useSelector((state) => state.setCurrentPage)
    
    // -------------------------------HANDLERS--------------------------------

    const handleChange = (e) =>{
        setValue(e.target.value)
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch(getVideogamesname(value))
        set_Currents_Page();
    }
    const handleClick = () =>{
        dispatch(getVideogames());
        setValue('')
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch(e);
        }
      };



    return(  
        <div className={style.container}>
            {videogames !== videogamesbyname ? <button className={style.button} onClick={handleClick}>Borrar</button> : null }
            < input className={style.input} type="text" name="SearchVideogame" value={value} onChange={handleChange}
             
             //para que busque tambien con la tecla Enter
             onKeyDown={handleKeyDown}
             
               placeholder="Search Videogame "/>
            <button className={style.button} onClick={handleSearch}>Buscar</button>

        

</div>
        
  );
}





 