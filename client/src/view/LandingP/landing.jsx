import { Link } from "react-router-dom";
import style from './landing.module.css'
import imagen from './imagenes/consola.jpg'


const Landing = () =>{
    return <div className={style.container}>
        
        <img src={imagen} alt="" className={style.image}/>
        <><Link to='/home'><button className={style.h1}>videogames</button></Link></>
        <><Link to='/home'><button className={style.button}>INICIAR</button></Link></>
        
        

    </div>
}

export default Landing;