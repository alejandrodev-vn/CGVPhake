const express = require('express');
const router = express.Router();

const controllerBooking = require('../controllers/booking.controller')
const middlewareAuth = require('../middlewares/auth.middleware')

router.get('/booking/:room/:id',middlewareAuth.requireAuth, controllerBooking.showSeats);

module.exports = router;