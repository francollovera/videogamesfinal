import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../redux/actions";
import style from './GenreSelect.module.css'



const GenreSelect = () =>{
    const genres = useSelector(({genres}) => genres);
    
    const dispatch = useDispatch();


   
    useEffect(() =>{
       
        dispatch(getGenres());
    }, []);

    return (
        <div className={style.container}>
        <>
          <label className={style.label} for="genres">Choose a Genre: </label>
      <select name="genres" >
        <option className={style.option} value="All">All Genres</option>
        
        {genres.map((genre) =>( 
                <option key = {genre.id} value={genre.name}>
                    {genre.name}
                    </option>
            ))}
      </select>
        
        </>
        </div>
    );

};
export default GenreSelect;