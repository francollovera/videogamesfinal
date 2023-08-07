import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import style from './Detail.module.css';
import { useEffect } from "react";
import Loading from "../Loading/Loading";

function Detail  (){
  //el useParams permite acceder a los parametros de la URL
    const params = useParams();
    const Detallejuego = useSelector((state) => state.detail)
    const dispatch = useDispatch();
    
    
    
    useEffect(() => {
      dispatch(getDetail(params.id));
      //actualiza el getDetail con el detalle de el videojuego
    
    }, [dispatch,params.id])
      //si cualquiera de estos valores cambia, se ejecuta el dispatch con los valores nuevos de params.id y se ejectuara
    return(
      <>
      {Detallejuego.length > 0 ? (
        <div className={style.container}>
          {Detallejuego.map((detalle, index) => (
            <div key={index}>
              <div className={style.imageContainer}>
                <img className={style.image} src={detalle.image} alt="" />
              </div>
              <div className={style.infoContainer}>
                <h1 className={style.name}>Name: {detalle.name}</h1>
                <h3 className={style.genres}>Genres: {detalle.genres}</h3>
                <h3 className={style.platforms}>Platforms: {detalle.platforms}</h3>
                <h3 className={style.released}> Released: {detalle.released}</h3>
                <h3 className={style.rating}>Rating: {detalle.rating} </h3>
                <h3 className={style.description}>Description: {detalle.description}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : 
        <Loading></Loading>
      }
    </>
    )}

export default Detail;