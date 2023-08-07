


import { GET_VIDEOGAMES, ORDER_BY_RATING, PAGINATION } from './actions';
import { POST_VIDEOGAMES } from './actions';
import { GET_DETAIL } from './actions';
import { GET_VIDEOGAMESNAME } from './actions';
import { GET_GENRES } from './actions';
import { GET_NAMES_BY_GENRE } from './actions';
import { ORDER_BY_NAME } from './actions';
import { ORDER_BY_ORIGIN } from './actions';
import { RESET_VIDEOGAMES } from './actions';
import { CLEAR_DETAIL } from './actions';
import { SET_CURRENT_PAGE } from './actions';




const initialState = {

    numPage: 1,
    videogames: [],
    allvideogames: [],
    todosvideogames: [],
    detail: [],
    detalle: [],
    videogamesbyname: [],
    genres: [],
    filtrado: [],
    filtered: [],
    order: 'asc',
    orderd: 'asd',
    originalVideogames: [],
    set_Current_Page: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allvideogames: action.payload,
                todosvideogames: action.payload,
                originalVideogames: action.payload
            };




        case POST_VIDEOGAMES:
            return { ...state, videogames: action.payload };

        case GET_DETAIL:

            return { ...state, detail: action.payload };

        case GET_VIDEOGAMESNAME:

            return { ...state, videogames: action.payload };

        case GET_GENRES:
            return { ...state, genres: action.payload }
                ;

        //home le pasa ese action.payload
        case GET_NAMES_BY_GENRE: {
            let value = action.payload;
            value === 'All' ? value = state.allvideogames :
                value = state.allvideogames.filter((game) => {
                    return game.genres.includes(action.payload)
                })
            return {
                ...state, videogames: value
            }
        };

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc' ?
                state.videogames.slice().sort(function (a, b) {

                    //metodo sort: ordena los elementos de forma ascendente o descendiente conun criterio especifico
                    //ORDEN Z-A

                    if (a.name > b.name) { return 1 } // si este numero es positivo, b.name deberia estar primero
                    if (b.name > a.name) {return -1 }
                    return 0;
                }) :

                //ORDEN A-Z
                state.videogames.slice().sort(function (a, b) {
                    if (a.name > b.name) { return -1 }
                    if (b.name > a.name) { return 1 }
                    return 0;
                })
            return {
                ...state,
                videogames: sortedArr
            }
            
        case ORDER_BY_RATING:
            let sArr = action.payload === 'asd' ?
                state.videogames.slice().sort(function (a, b) {
                    if (a.rating > b.rating) { return 1 }
                    if (b.rating > a.rating) { return -1 }
                    return 0;
                }) :
                state.videogames.slice().sort(function (a, b) {
                    if (a.rating > b.rating) { return -1 }
                    if (b.rating > a.rating) { return 1 }
                    return 0;
                })
            return {
                ...state,
                videogames: sArr
            }

      

           

           
        case ORDER_BY_ORIGIN: {
            const { allvideogames } = state;
            let response;
            const juegogamesdb = allvideogames.filter(videogame => typeof videogame.id === 'string')
            const gamesapi = allvideogames.filter(videogame => typeof videogame.id === 'number')
            switch (action.payload) {
                case 'Api':
                    response = gamesapi;
                    break;
                case 'Local':
                    response = juegogamesdb;
                    break;
                default:
                    response = allvideogames;
                    break;
            }
            
            return {
                ...state,
                videogames: response
            }
        }
        case RESET_VIDEOGAMES:
            return {
                ...state,
                videogames: state.originalVideogames,
                allvideogames: state.originalVideogames,
                todosvideogames: state.originalVideogames
            };

        case CLEAR_DETAIL:
            return {
                ...state,
                detail: action.payload
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                set_Current_Page: action.payload
            }
        case PAGINATION: {
            return {
                ...state,
                videogame: action.payload
            }
        }
        default:
            return { ...state }
    }

};



export default rootReducer;