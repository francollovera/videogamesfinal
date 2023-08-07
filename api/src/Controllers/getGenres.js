require('dotenv').config()
const {API_KEY} = process.env;
const axios = require('axios')
const { Genres } = require('../db')

const getGenres = async ()=>{
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const api = apiGenres.data.results;
    api.map((genre) =>{
        Genres.findOrCreate({
            where: {
                name: genre.name
            }
        })
    })
    const allgenres = await Genres.findAll({
        attributes: { excludes: ['updatedAt','createdAt']}
    })
    return allgenres;
}

        module.exports = { getGenres }