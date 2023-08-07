
import React from "react";
import style from './Paginate.module.css' 
import Loading from "../Loading/Loading";
import image from './Imagen/flecha-derecha-line-icono-simbolo-negro-sobre-fondo-blanco-pex73j.png'




function Paginado({ gamesPerPage, videogames, paginado, currentPage }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(videogames / gamesPerPage); i++) {
      pageNumbers.push(i);
    }
  
   
  return (
    <nav>
      <div className={style.paginado}>
        {currentPage !== 1 && (
          <div className={style.number}>
            <a
              className={style.link}
              href="#"
              onClick={() => paginado(currentPage - 1)}
            >
              <img className={style.flecha2} src={image} alt="" /> 
            </a>
          </div>
        )}
        {pageNumbers.length ? (
          pageNumbers.map((number) => (
            <div key={number} className={style.number}>
              <a
                className={`${style.link} ${currentPage === number ? style.active : ''}`}
                href="#"
                onClick={() => paginado(number)}
              >
                {number}
              </a>
            </div>
          ))
        ) : (
          <Loading />
        )}
        {currentPage !== pageNumbers.length && (
          <div className={style.number}>
            <a
              className={style.link}
              href="#"
              onClick={() => paginado(currentPage + 1)}
            >
              <img className={style.flecha} src={image} alt="" /> 
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Paginado;