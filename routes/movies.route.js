const express = require('express');
const router = express.Router();
var upload = require('../multer')


const controllerMovies = require('../controllers/movies.controller')
router.get('/movies', controllerMovies.allMovies);
router.get('/movies/autocomplete', controllerMovies.autocompleteSearch);
router.get('/movies/search', controllerMovies.search);
router.get('/movies/category', controllerMovies.redirectMovies);
router.get('/movies/category/:value', controllerMovies.showMoviesByCategory);
router.get('/movies/:slug', controllerMovies.movieDetail);


module.exports = router;