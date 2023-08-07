const {Router}= require('express');
const { getGenres } = require('../Controllers/getGenres')

const genresRouter = Router();


genresRouter.get('/', async (req, res) => {
  try {
    const allGenres = await getGenres();
    res.status(200).json(allGenres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = genresRouter;