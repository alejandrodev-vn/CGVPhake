const {connection} = require('../database')
const Movie = require('../models/movies.model')
const Category = require('../models/categories.model')
const MovieShowing = require('../models/movies-showing.model')
const Area = require('../models/areas.model')
const Room = require('../models/room.model')
const Cinema = require('../models/cinemas.model')
const User = require('../models/users.model')
const {convertToYYYYMMDD} = require('../utils/mongoose')

// const Confirm = require('prompt-confirm');
// const { find } = require('../models/movies.model')
// const e = require('express')


module.exports.index =  (req, res) =>{
    res.render('dashboard/admin',{
        layout: 'dashboard/admin',
        pageTitle:'Dashboard'
    })
}
module.exports.listMovies = async (req, res) => {
    try{
        const categories = await Category.find({});
        const movies = await Movie.find({});
        if(movies.length){
            res.render('dashboard/movie/list',{
                layout: 'dashboard/movie/list',
                movies:movies
            })
        }else { 
            res.render('dashboard/movie/list',{
                notification:`<h1>Hiện không có dữ liệu trong bảng</h1>`
            })
        } 
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.newMovie = async (req, res) => {
    try{
        const categories = await Category.find({})
        res.status(200).render('dashboard/movie/new',{
            layout: 'dashboard/movie/new',
            categories:categories,
            pageTitle:'CGV Phake - Thêm phim'
        });
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postMovie = async (req, res) => {
    var {title, actors, directors, premiere, description, time, ageAllowed, categories, languages} = req.body;
    let imageUrl= req.file ? req.file.filename : "";
    let values= {title, actors, directors, premiere: new Date(premiere), time, description, imageUrl, ageAllowed,categories, languages}
    try{
        let newMovie = new Movie(values)
        await newMovie.save();
    }
    catch(err){
        console.log(err)
    }
    res.redirect('/admin/movie')
   
}
module.exports.editMovie = async (req, res) => {
    var id = req.params.id;
    try{
        const categories = await Category.find({});
        const movie = await Movie.findOne({_id:id});
        var premiere = convertToYYYYMMDD(movie.premiere)
        res.status(200).render('dashboard/movie/edit', {
            layout:'dashboard/movie/edit',
            movie:movie,
            premiere,
            categories:categories,
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditMovie = async (req, res) => {
    try{
        var id = req.body.id;
        var {title, actors, directors, premiere, description, showhide, time, ageAllowed, categories, languages, showhide} = req.body;
        let imageUrl= req.file ? req.file.filename : "";
        if(imageUrl!==''){
            var values= {title, actors, directors, premiere, time, description, showhide, imageUrl, ageAllowed,categories, languages}
        }else  var values= {title, actors, directors, premiere, time, description, showhide, ageAllowed,categories, languages}
            await Movie.findOneAndUpdate({_id:id}, values, function(err, data){
                if(err) console.log(err)
                res.redirect('/admin/movie')
            })
    }
    catch(err){
        console.log(err)
    }
   
    
}
module.exports.deleteMovie = async (req, res) => {
   try{
        const id = req.params.id;
        const movie = await Movie.findByIdAndRemove({_id:id})
        res.redirect('/admin/movie')
   }
   catch(err){
        console.log(err)
   }
}
module.exports.showingMovie = async (req, res) => {
    try{
        const id = req.params.id;
        const showings = await MovieShowing.find({movieId:id});
        if(showings.length){

        const movieId = showings[0].movieId //getIdMovie

        const room = await Room.find({_id:showings[0].roomId})

        const cinemaId = room[0].cinemaId //getCinemaId

        const cinema = await Cinema.find({_id:cinemaId})
        const movie = await Movie.find({_id:movieId})
     
            res.render('dashboard/movie/detail',{
                layout: 'dashboard/movie/detail',
                showings:showings,
                movie:movie[0],
                cinema:cinema[0].nameCinema,
                room:`Cinema ${room[0].nameRoom}`
            })
        }else { 
            res.render('dashboard/movie/detail',{
                layout: 'dashboard/movie/detail',
                showings:'',
                notification:`Hiện không có suất chiếu nào`
            })
        } 
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.listCategories = async (req, res) => {
    try{
        const categories = await Category.find({})
        res.status(200).render('dashboard/category/list',{
            layout: 'dashboard/category/list',
            categories:categories
        });
    }
    catch(err){
        console.log(err)
    }
  
}
module.exports.addCategory = (req, res) => {
    res.status(200).render('dashboard/category/new',{
        layout: 'dashboard/category/new'
    });
}
module.exports.postCategory = async (req, res) => {

    var values = req.body
    try{
        let newCategory = new Category(values)
        await newCategory.save();
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/admin/category')
}
module.exports.editCategory = async (req, res) => {
    var id = req.params.id;
    try{
        await Category.findOne({_id:id}, function (err, category) {
         if(err) {
           console.log(err)
         }
         res.status(200).render('dashboard/category/edit', {
            layout:'dashboard/category/edit',
            category:category
         })
        });
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditCategory = async (req, res) => {
    try{
        var id = req.body.id;
        var values= req.body
        await Category.findOneAndUpdate({_id:id}, values, function(err, data){
            if(err) console.log(err)
            res.redirect('/admin/category')
        })
    }
    catch(err){
        console.log(err)
    }
  
    
   
}
module.exports.deleteCategory = async (req, res) => {
    try{
         const id = req.params.id;
         const category = await Category.findByIdAndRemove({_id:id})
         res.redirect('/admin/category')
    }
    catch(err){
         console.log(err)
    }
 }
module.exports.listAreas = async (req, res) => {
    try{
        const areas = await Area.find({})
        res.status(200).render('dashboard/area/list',{
            layout: 'dashboard/area/list',
            areas:areas
        });
    }
    catch(err){
        console.log(err)
    }
}
module.exports.addArea = (req, res) => {
    res.status(200).render('dashboard/area/new',{
        layout: 'dashboard/area/new',
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
   res.status(200).redirect('/admin/area')
}
module.exports.editArea = async (req, res) => {
    var slug = req.params.slug;
    try{
        await Area.findOne({slug:slug}, function (err, area) {
         if(err) {
           console.log(err)
         }
         res.status(200).render('dashboard/area/edit', {
            layout:'dashboard/area/edit',
            area:area
         })
        });
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditArea = async (req, res) => {
    try{
        var slug = req.body.slug;
        var values= req.body
        await Area.findOneAndUpdate({slug:slug}, values, function(err, data){
            if(err) console.log(err)
            res.redirect('/admin/area')
        })
    }
    catch(err){
        console.log(err)
    }
  
    
   
}
module.exports.deleteArea = async (req, res) => {
    try{
         const slug = req.params.slug;
         const area = await Area.findByIdAndRemove({slug:slug})
         res.redirect('/admin/area')
    }
    catch(err){
         console.log(err)
    }
 }
 module.exports.listCinemas = async (req, res) => {
    try{
        const cinemas = await Cinema.find({})
        const areas = await Area.find({})
        res.status(200).render('dashboard/cinema/list',{
            layout: 'dashboard/cinema/list',
            cinemas:cinemas,
            areas:areas
        });
    }
    catch(err){
        console.log(err)
    }
}
 module.exports.addCinema = async (req, res) => {
    try{
        const areas = await Area.find({});
        res.status(200).render('dashboard/cinema/new',{
            layout:'dashboard/cinema/new',
            areas:areas,
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
        res.status(200).redirect('/admin/cinema')
    }
    catch(err){
        console.log(err)
    }
}
module.exports.editCinema = async (req, res) => {
    try{
        var slug = req.params.slug;
        const cinema = await Cinema.find({slug:slug})
        const areas = await Area.find({})
        res.status(200).render('dashboard/cinema/edit', {
            layout:'dashboard/cinema/edit',
            areas:areas,
            cinema:cinema[0]
         })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditCinema = async (req, res) => {
    try{
        var slug = req.body.slug;
        var values= req.body
        await Cinema.findOneAndUpdate({slug:slug}, values, function(err, data){
            if(err) console.log(err)
            res.redirect('/admin/cinema')
        })
    }
    catch(err){
        console.log(err)
    }
  
    
   
}
module.exports.deleteCinema = async (req, res) => {
    try{
         const slug = req.params.slug;
         const cinema = await Cinema.findByIdAndRemove({slug:slug})
         res.redirect('/admin/cinema')
    }
    catch(err){
         console.log(err)
    }
 }
module.exports.listMovieShowings = async (req, res) =>{
    try{
        const movieShowings = await MovieShowing.find({})
        const movies = await Movie.find({})
        const cinemas = await Cinema.find({})
        const rooms = await Room.find({})
        if(movieShowings.length){
            res.render('dashboard/movie-showing/list',{
                layout: 'dashboard/movie-showing/list',
                movieShowings: movieShowings,
                movies:movies,
                cinemas:cinemas,
                rooms:rooms
            })
        }
        
    }
    catch(err){
        console.log(err)
    }
}
module.exports.addMovieShowing = async (req, res) =>{
    const Movie = require('../models/movies.model')
    try{
        const cinemas = await Cinema.find({});
        const movies = await Movie.find({});
        res.render('dashboard/movie-showing/new',{
            layout: 'dashboard/movie-showing/new',
            cinemas:cinemas,
            movies:movies,
            notification:''
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
   res.status(200).redirect('/admin/movie-showing')
}
module.exports.editMovieShowing = async (req, res) => {
    try{
        var id = req.params.id;
        const movieShowing = await MovieShowing.findOne({_id:id})
        const cinemas = await Cinema.find({});
        const movies = await Movie.find({});
        var dateShowing = convertToYYYYMMDD(movieShowing.dateShowing)
        console.log(dateShowing)
        res.status(200).render('dashboard/movie-showing/edit', {
            layout:'dashboard/movie-showing/edit',
            movieShowing:movieShowing,
            cinemas:cinemas,
            movies:movies,
            dateShowing
         })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditMovieShowing = async (req, res) => {
    try{
        var id = req.body.id;
        var values= req.body
        await MovieShowing.findOneAndUpdate({_id:id}, values, function(err, data){
            if(err) console.log(err)
            res.redirect('/admin/movie-showing')
        })
    }
    catch(err){
        console.log(err)
    }
  
    
   
}
module.exports.deleteMovieShowing = async (req, res) => {
    try{
         const id = req.params.id;
         const movieShowing = await MovieShowing.findByIdAndRemove({_id:id})
         res.redirect('/admin/movie-showing')
    }
    catch(err){
         console.log(err)
    }
 }
 module.exports.listRoom = async (req, res) => {
    try{
         const slug = req.params.slug;
         const cinema = await Cinema.find({slug:slug})
        
         const cinemaId = cinema[0]._id
         const rooms = await Room.find({cinemaId: cinemaId})
         if(rooms.length){
            res.status(200).render('dashboard/cinema/room', {
                layout:'dashboard/cinema/room',
                rooms:rooms,
                cinema:cinema[0]
             })
         } else { 
            res.render('dashboard/cinema/room',{
                layout: 'dashboard/cinema/room',
                rooms:'',
                notification:`Hiện không có phòng nào`
            })
        } 
    }
    catch(err){
         console.log(err)
    }
 }
 module.exports.listRooms = async (req, res) => {
    try{
         const rooms = await Room.find({})
         const cinemas = await Cinema.find({})
        res.status(200).render('dashboard/room/list', {
            layout:'dashboard/room/list',
            rooms:rooms,
            cinemas:cinemas
        }) 
    }
    catch(err){
         console.log(err)
    }
 }
 module.exports.addRoom = async (req, res) => {
    try{
        const cinemas = await Cinema.find({});
        res.status(200).render('dashboard/room/new',{
            layout:'dashboard/room/new',
            cinemas:cinemas,
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
   res.status(200).redirect('/admin/room')
}
module.exports.editRoom = async (req, res) => {
    try{
        var id = req.params.id;
        const room = await Room.find({})
        
        const cinemaId = room[0].cinemaId

        const cinemas = await Cinema.find({})
        res.status(200).render('dashboard/room/edit', {
            layout:'dashboard/room/edit',
            room:room[0],
            cinemas:cinemas
         })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.postEditRoom = async (req, res) => {
    try{
        var id = req.body.id;
        var values= req.body
        await Room.findOneAndUpdate({_id:id}, values, function(err, data){
            if(err) console.log(err)
            res.redirect('/admin/room')
        })
    }
    catch(err){
        console.log(err)
    }
  
    
   
}
module.exports.deleteRoom = async (req, res) => {
    try{
         const id = req.params.id;
         const room = await Room.findByIdAndRemove({_id:id})
         res.redirect('/admin/room')
    }
    catch(err){
         console.log(err)
    }
 }
 module.exports.listUsers = async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).render('dashboard/user/list',{
            layout: 'dashboard/user/list',
            users:users
        });
    }
    catch(err){
        console.log(err)
    }
  
}
module.exports.role = async (req, res, next) => {
    res.redirect('/admin/user')
    
}
module.exports.updateRole = async (req, res) => {
    try{
        const id = req.params.id
        const role = req.body.role
        const users = await User.findByIdAndUpdate(id,{role:role})
        res.redirect('/admin/user')
    }
    catch(err){
        console.log(err)
    }
  
}
module.exports.mail =  (req, res) => {
    res.status(200).render('dashboard/mail/formMail',{
        layout: 'dashboard/mail/formMail'
    });
}
module.exports.test =  (req, res) => {
    res.status(200).render('dashboard/room/test',{
        pageTitle:'Test'
    })
}
module.exports.sendMail =  (req, res, next) => {
    const nodemailer = require('nodemailer')
    var transporter =  nodemailer.createTransport({ // config mail server
        service:"gmail",
        auth: {
            user: 'huynttps12133@fpt.edu.vn',
            pass: 'Huytra2642001'
        },
        tls: {rejectUnauthorized:false}

    });
    var mainOptions = { 
        from: 'huynttps12133@fpt.edu.vn',
        to: req.body.email,
        subject: 'Cgv thông báo',
        text: 'You recieved message from ' + req.body.email,
        html: 'Hello'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
  
}