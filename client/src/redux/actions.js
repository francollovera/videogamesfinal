
//  el unico que puede cambiar el estado global es la funcion reducer o señor reducer.
// Para ello le envio una instruccion de que es lo que quiero que haga por medio de action que tiene un type y describa lo que haga.


import axios from 'axios';


export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const POST_VIDEOGAMES = 'POST_VIDEOGAMES';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_VIDEOGAMESNAME = 'GET_VIDEOGAMESNAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_NAMES_BY_GENRE = 'GET_NAMES_BY_GENRE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const ORDER_BY_ORIGIN = 'ORDER_BY_ORIGIN';
export const RESET_VIDEOGAMES = 'RESET_VIDEOGAMES';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const PAGINATION = 'PAGINATION';




export const getVideogames = () =>{
   
    return async function (dispatch){
        const response = await axios.get(`/videogames`);
        const cleanVideogame = response.data.map((videogame) => {
          if (typeof videogame.id === "string") {
            let genres = [];
            videogame.genres.map((genre) => genres.push(genre.name));
            videogame.genres = genres;
          }
          return videogame;
        });
    
    dispatch({ type: GET_VIDEOGAMES, payload: cleanVideogame })
}};

export const postVideogames = () =>{
   
    return async function (dispatch){
        const apiData = await axios.get(`/videogames`);
    
    const Postvideogames = apiData.data;
    dispatch({ type: POST_VIDEOGAMES, payload: Postvideogames })
};
};

export const getDetail = (id) =>{
    
    return async function (dispatch){
        const response = await axios.get (
            `/videogames/${id}`
        );
      
        const cleanVideogame = response.data.map((videogame) => {
          if (typeof videogame.id === "string") {
            let genres = [];
            videogame.genres.map((genre) => genres.push(genre.name));
            videogame.genres = genres;
          }
          return videogame;
        });
        
        dispatch ({type: GET_DETAIL, payload: cleanVideogame});
    }};



export const getVideogamesname = (name) =>{
    return async function (dispatch){
        const apiData = await axios.get (
            `/videogames?name=${name}`
        );
        const gamesbyname = apiData.data;
        dispatch ({type: GET_VIDEOGAMESNAME, payload: gamesbyname})
    }}


export const getGenres = () =>{
    return async function (dispatch){
                const apiData = await axios.get(
                    `/genres`
                );
                const genres = apiData.data;
                dispatch ({type: GET_GENRES, payload: genres});

}};
//desde el home enviamos el value
export const getnamesbyGenre = (value) =>{
       return ({type: GET_NAMES_BY_GENRE, payload: value})

};

export const orderByName = (payload) => {
    return {
      type: 'ORDER_BY_NAME',
      payload,
    };
  };

  export const orderByRating = (payload) => {
    return {
      type: 'ORDER_BY_RATING',
      payload,
    };
  };

  export const orderByOrigin = (status) => {
    return {
      type: 'ORDER_BY_ORIGIN',
      payload: status,
    };
  };
  
  export const resetVideogames = () => {
    return { type: RESET_VIDEOGAMES };
  };

  export const clear_detail = () => {
    return { type: CLEAR_DETAIL , payload : {}};
  };

  export const set_Currents_Page = () =>{
    return { type: SET_CURRENT_PAGE , }
  }
  export const Pagination = () =>{
    return { type: PAGINATION , payload : {}}
  }