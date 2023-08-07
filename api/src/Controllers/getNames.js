require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');

const { concat } = require('./getGames')


const getNames = async (name) => {
 
    const juegos = await concat();
    if(name){
      const filtrado = juegos.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()))
      .splice(0, 15);
      
      if( filtrado.length>0 ){
        return filtrado;
      }else{
        throw new Error('No se encontro el juego');
      }
     
    }else{
      return videogame;
    }
   

    
}  

module.exports = { getNames };
