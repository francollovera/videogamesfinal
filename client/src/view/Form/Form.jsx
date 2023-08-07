import { useState, useEffect } from "react";
import Style from './Form.module.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import { useDispatch } from "react-redux";


const Form = () =>{
    const genres = useSelector(({genres}) => genres);
    const dispatch = useDispatch();
   
   

    // ----------------------------------------STATES ---------------------------------------------------


    
    const [ratingError, setRatingError] = useState('');
    const [form , setForm] = useState({
        name: '',
        description:'',
        genres:[],
        platforms: [],
        image: '',
        released: '',
        rating: '',

     })
     const [error, setError] = useState({
        name: '',
        description:'',
        genres:[],
        platforms: [],
        image: '',
        released: '',
        rating: '',

    })



    //  -----------------------------------USE EFFECTS------------------------------------------------------
     useEffect(() =>{
       
        dispatch(getGenres());
    }, []);


    
// -----------------------------------------VALIDATIONS-----------------------------------------------------
    

    const validate = (form) => {
        if (/^[a-zA-Z\s-]+$/.test(form.name)) {
          
        } else {
            setError({...error, name: 'Hay un error en el name'})
        }
        if(form.name === ''){
            setError({...error, name: 'El nombre esta vacio'})
        }

        let ratingError = '';
    if (form.rating > 5.0) {
      ratingError = 'El rating no puede ser mayor a 5.0';
    }
    
    setRatingError(ratingError);
    return ratingError === '';
      };

    //   ------------------------------------------EVENTOS-----------------------------------------------



      const changePlatforms = (event) =>{
    
    setForm ({...form, platforms :[...form.platforms, event.target.value]})       //para poder modificar la propiedad property por el valor de mi nuevo estado.
    
      }

      const changeGenres = (event) =>{
        console.log(event.target.value)
        setForm ({...form, genres :[...form.genres, event.target.value]})       //para poder modificar la propiedad property por el valor de mi nuevo estado.
        
       
          }
    const changeHandler = (event) =>{
const property = event.target.name; //event me dice quien fue quien disparo el evento.
const value = event.target.value;

setForm ({...form, [property]: value})
    
    validate({...form, [property]:value})
}

    const submitHandler = async (event)=>{
    event.preventDefault()
    await axios.post('http://localhost:3001/videogames',form)
    .then(res => alert('Juego Creado con Exito'))
    .catch(err=> console.log(err))
    }



    const deletePlatform = (index) => {
        const platforms = [...form.platforms];
        platforms.splice(index, 1);
        setForm({...form, platforms});
    }
    const deleteGenres = (index) => {
        const genres = [...form.genres];
        genres.splice(index, 1);
        setForm({...form, genres});
    }






    
    const validForm = form.name && form.description && form.platforms.length && form.genres.length && form.image && form.rating;

    return(  
        <div className={Style.content}>
        <form className={Style.container} onSubmit={submitHandler}>
        
        <div className={Style.formcontainer}>
        <label className={Style.valores}>Name: </label>
        
        <input type="text" value={form.name} onChange={changeHandler} name="name"/>
        <span>{error.name}</span>
        </div>
        
    
        <div>
        <label className={Style.description}>Description: </label>
        <input type="text" value={form.description} onChange={changeHandler} name="description"/>
        </div>

        <div>
        <label className={Style.valores}>Platforms: </label>
        <select className={Style.select}  onChange={changePlatforms} name="platforms" defaultValue='Seleccionar Plataformas' >

         <option value='Seleccionar Plataformas'>Seleccionar Plataformas</option>  
        <option value='PlayStation 5' >PlayStation 5</option>
        <option value='Xbox Series S/X'>Xbox Series S/X</option>
        <option value='PlayStation 4'>PlayStation 4</option>
        <option value='PlayStation 3'>PlayStation 3</option>
        <option value='PlayStation 3'>PC</option>
        <option value='Xbox One'>Xbox One</option>
        </select>
        
        {form.platforms.map((platform, index) => (
                            <div key={index}>
                                <p className={Style.parrafo}>{platform}</p>
                                <button className={Style.buttoneliminar}type="button" onClick={() => deletePlatform(index)}>X</button>
                            </div>
                        ))}
                    </div>
                    <div>
        <label className={Style.valores}>Genres: </label>
        <select className={Style.select}  onChange={changeGenres} name="genres" defaultValue='Seleccionar Genero' >

         <option value='Seleccionar Genero'>Seleccionar Genero</option>  
         {genres.map((g) =>( 
                <option key = {g.id} value={g.name}>
                    {g.name}
                    </option>
            ))}
        </select>
        
        {form.genres.map((genre, index) => (
                            <div key={index}>
                                <p className={Style.parrafo}>{genre}</p>
                                <button className={Style.buttoneliminar}type="button" onClick={() => deleteGenres(index)}>X</button>
                            </div>
                        ))}
                    </div>
         


        <div className={Style.valores}>
        <label className={Style.valores}>Escribe la URL de la imagen: </label>
        <input  className={Style.inputimage} type="text"  value={form.image} onChange={changeHandler} name="image"/>
        </div>

        <div>
        <label className={Style.valores}>Released: </label>
        <input type="text" value={form.released} onChange={changeHandler} name="released"/>
        </div>
   
        <div>
        <label className={Style.valores}>Rating: </label>
        <input type="text" value={form.rating} onChange={changeHandler} name="rating"/>
        {ratingError && <div className={Style.error}>{ratingError}</div>}
        </div>
            
        {validForm ? <button type="submit" className={Style.boton}>Agregar</button> : null}
    
    </form>
    </div>
)}

export default Form;