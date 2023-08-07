import style from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";
import imagen from './imagen/imagen.png'


 
const Card = ({game}) =>{
    

    

    return(  
        <div className={style.container}>
        <Link to={`/videogames/${game.id}`} className={style.link}><p>{game.name}</p></Link>
        
        <img className={style.image} src={game.image} alt={game.image}/> 
        <p className={style.genres}>{'Genres: '}{game.genres}</p>
        <div className={style.estrella}>
        <img src={imagen } alt="Yellow Star" />
        <p> { game.rating}</p>
      </div>
 
    </div>
    )
    }
    
    export default Card;





