import React from "react"
import imagen from './multimedia/FotoJet.jpg' 
import Style from './Loading.module.css';

const Loading = ()=>{
    return ( 
    <div className={Style.container}>
    <img className={Style.imagen} src={imagen}/>

    </div>
    )}
    export default Loading;