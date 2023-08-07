

require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genres } = require('../db');




const getGames = async () => {
  let page = 1;
  let allGames = []
  while(page < 6){
    const dataApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
    const gameApi = dataApi.data.results.map((game) => {
      return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres?.map((gen) => gen.name),
      platforms: game.platforms?.map((plat) => plat.platform.name),
      released: game.released,
      rating: game.rating,
    };
  });
    allGames = allGames.concat(gameApi);
    page++
  }

  return allGames;
};

const databaseGames = async () =>{
  
  return await Videogame.findAll({
    include: {
        model: Genres,
        attributes: ['name'], 
        through: {
            attributes: [],
        },
    }
})
  
}


const concat = async () => {
const dataApi = await getGames()
const datadb = await databaseGames()
const alldata = [...dataApi, ...datadb];
console.log(datadb)
return alldata;
}


module.exports = { concat };





