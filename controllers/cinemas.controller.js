const { connection } = require('../database');
const Cinema = require('../models/cinemas.model')
const Area = require('../models/areas.model')
const MovieShowing = require('../models/movies-showing.model')
const {convertToYYYYMMDD} = require('../utils/mongoose')


module.exports.addMovieShowing = async (req, res) =>{
    const Movie = require('../models/movies.model')
    try{
        const cinemas = await Cinema.find({});
        const movies = await Movie.find({});
        res.render('cinemas/add-movie-showing',{
            cinemas:cinemas,
            movies:movies,
            pageTitle:'Thêm suất chiếu'
        })
    }
    catch{
        console.log(err)
    }
}
module.exports.postMovieShowing = async (req, res) =>{
    var values = req.body
    try{
        let newMovieShowing = new MovieShowing(values)
        await newMovieShowing.save();
        console.log(values)
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/cinemas')
}
module.exports.showRooms = async (req, res) => {
    const Room = require('../models/room.model')
    try{
        var id = req.params.id;
        const rooms = await Room.find({cinemaId:id})
        if(rooms.length){
            var result = [];
            rooms.forEach(room =>{
                let rooms = {
                    id:room._id,
                    nameRoom:room.nameRoom
                }
                result.push(rooms)
            })
            res.send(result)
        }
        else{
            var result='Không tìm thấy phòng nào';
            res.send(result)
        }
    }
    catch(err){
        console.log(err)
    } 
}
module.exports.addArea = (req, res) => {
    res.status(200).render('cinemas/add-area',{
        pageTitle:'CGV Phake - Thêm khu vực'
    });
}
module.exports.postArea = async (req, res) => {

    var values = req.body
    try{
        let newArea = new Area(values)
        await newArea.save();
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/cinemas')
}
module.exports.showCinemas = async (req, res) => {
    try{
        const areas = await  Area.find({});
        const cinemas = await  Cinema.find({});
        res.render('cinemas/site',{
            areas:areas,
            cinemas:cinemas,
            pageTitle:'Rạp phim'
        })
    }
    catch(err){
        console.log(err)
    }   
}
module.exports.redirectCinemas = (req, res) =>{
    res.status(200).redirect('/cinemas')
}
module.exports.showTheater = async (req, res) => {
    const Movie = require('../models/movies.model')
    try{
        const movieShowing = await MovieShowing.find({cinemaId:req.params.id})
        if(movieShowing.length){
            var result = [];
            MovieShowing
            .find({cinemaId:req.params.id})
            .populate('movieId')
            .exec(function(err, movie) {
                for (let info of movie){
                    let infoMovie = {
                        room:info.roomId,
                        id:info._id,
                        slug:info.movieId.slug,
                        title:info.movieId.title,
                        languages:info.movieId.languages,
                        imageUrl:info.movieId.imageUrl,
                        startTime:info.startTime,
                        endTime:info.endTime,
                        dateShowing:convertToYYYYMMDD(info.dateShowing)
                    }  
                result.push(infoMovie)
                }
                res.send(result)
            });
        }else { 
            var result = '<h3 class="text-center">Không có suất nào</h3>'
            res.send(result)
        }       
    }
    catch(err){
        console.log(err)
    } 
}
module.exports.addCinema = async (req, res) => {
    try{
        const areas = await Area.find({});
        res.status(200).render('cinemas/add-cinema',{
            areas:areas,
            pageTitle:'CGV Phake - Thêm Rạp'
        });
    }
    catch(err){
        console.log(err)
    }    
}
module.exports.postCinema = async (req, res) => {
    var values = req.body
    try{
        let newCinema = new Cinema(values)
        await newCinema.save();
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/cinemas')
}

module.exports.addRoom = async (req, res) => {
    try{
        const cinemas = await Cinema.find({});
        res.status(200).render('cinemas/add-room',{
            cinemas:cinemas,
            pageTitle:'CGV Phake - Thêm phòng'
        });
    }
    catch(err){
        console.log(err)
    }    
}
module.exports.postRoom = async (req, res) => {
    const Room = require('../models/room.model')
    var values = req.body
    try{
        let newRoom = new Room(values)
        await newRoom.save();
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/cinemas')
}

// module.exports.editCategory = async (req, res) => {
//     var value = req.params.value;
//     try{
//         await Category.findOne({value:value}, function (err, category) {
//          if(err) {
//            console.log(err)
//          }
//          res.status(200).render('categories/edit-category', {
//            category:category,
//            pageTitle:'CGV Phake - Chỉnh sửa Thể loại'
//          })
//         });
//     }
//     catch{
//         console.log(err)
//     }
// }
// module.exports.postEditCategory = async (req, res) => {

//     var id = req.body.id;
//     console.log(id)
//     var values= req.body
//     await Category.findOneAndUpdate({_id:id}, values, function(err, data){
//         if(err) console.log(err)
//         res.redirect('/categories')
//     })
    
   
// }

