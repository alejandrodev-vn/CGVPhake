const express = require('express');
const router = express.Router();

const controllerCinemas = require('../controllers/cinemas.controller')

router.get('/cinemas', controllerCinemas.showCinemas);
router.post('/cinemas/add-movie-showing/:id/select-room', controllerCinemas.showRooms);
router.post('/cinemas/:id', controllerCinemas.showTheater);
router.get('/cinemas/:id', controllerCinemas.redirectCinemas);




module.exports = router;