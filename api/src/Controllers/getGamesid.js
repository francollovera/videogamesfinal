require('dotenv').config();

const { concat } = require('./getGames');

const getGamesid = async (id) => {
    console.log(id)
const allgames = await concat();
const game = allgames.filter((game) => game.id == id)
  if(game.length > 0){
    return game
}else{ 
  throw new Error('Juego no encontrado')
}}

module.exports = { getGamesid }