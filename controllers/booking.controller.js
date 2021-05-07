const { connection } = require('../database');
const Booking = require('../models/booking.model')
const MovieShowing = require('../models/movies-showing.model')
const Movie = require('../models/movies.model')
const Cinema = require('../models/cinemas.model')
const Room = require('../models/room.model')
const {convertToDDMMYYYY} = require('../utils/mongoose')


module.exports.showSeats = async (req, res)=>{
    try{
        const movieShowing = await MovieShowing.find({_id:req.params.id})

        const movieId = movieShowing[0].movieId //getIdMovie

        const room = await Room.find({_id:req.params.room})

        const cinemaId = room[0].cinemaId //getCinemaId

        const cinema = await Cinema.find({_id:cinemaId})
        const movie = await Movie.find({_id:movieId})
        res.render('booking/site',{
            pageTitle:'Mua vé',
            dateShowing: convertToDDMMYYYY(movieShowing[0].dateShowing),
            movieShowing:movieShowing[0],
            movie:movie[0],
            cinema:cinema[0].nameCinema,
            room:`Cinema ${room[0].nameRoom}`
        })
    }
    catch(err){
        console.log(err)
    }
}
