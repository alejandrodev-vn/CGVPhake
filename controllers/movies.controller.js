const {connection} = require('../database')
const Movie = require('../models/movies.model')
const Category = require('../models/categories.model')
const {convertToYYYYMMDD} = require('../utils/mongoose')
const { query } = require('express')

module.exports.allMovies = async (req, res) => {
    try{
        const categories = await Category.find({});
        const movies = await Movie.find({});
        res.status(200).render('movies/now', {
            movies:movies,
            categories:categories,
            pageTitle:'CGV Phake - Phim'
          })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.movieDetail = async (req, res) => {
    var getQ = req.params.slug
    var q = getQ.replace(/[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/g, '\\$&');
    try{
        const categories = await Category.find({});
        const movie = await Movie.find({slug:q});
        if(!movie.length){
            res.status(200).render('movies/notFoundMovie',{
                pageTitle:'Không tìm thấy phim'
            });
            return;
        }
        let getNameCategory = [];
        let temp = movie[0].categories
        for (let category of categories){
            temp.forEach(e => {
                if(e == category.value){
                getNameCategory.push(category.title)
            }
            });  
        }
        res.status(200).render('movies/movie-detail', {
            movie:movie[0],
            categories:categories,
            getNameCategory,
            pageTitle:movie[0].title
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports.autocompleteSearch = (req, res) => {
    var regex = new RegExp(req.query['term'],'i')
    var fitlerByTitle = Movie.find({title:regex},{'title':1}).sort({'updated_at':-1}).sort({'created_at':-1}).limit(20);
    fitlerByTitle.exec(function(err,data){
        var result = [];
        if(!err){
            if(data && data.length && data.length>0){
                data.forEach(movie =>{
                    let movies = {
                        id:movie._id,
                        label:movie.title
                    }
                    result.push(movies)
                })
            }
            res.status(200).jsonp(result)
        }
    })

}
module.exports.search = async (req, res) => {
    if(req.query.q){
        var getQ = req.query.q;
        var q = getQ.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '\\$&');
        try{
            const categories = await Category.find({});
            const movies = await Movie.fuzzySearch(q);
            if(!movies.length){
                res.status(200).render('movies/notFoundMovie',{
                    pageTitle:'Không tìm thấy phim'
                });
                return;
            }
            res.status(200).render('movies/search', {
                movies:movies,
                categories:categories,
                pageTitle:'CGV Phake - Tìm kiếm'
            })
        }
        catch{  
            console.log(err)
        }
    }else {
        try{
            const categories = await Category.find({});
            const movies = await Movie.find({});
            res.status(200).render('movies/now', {
                movies:movies,
                categories:categories,
                pageTitle:'CGV Phake - Phim'
              })
        }
        catch{
            console.log(err)
        }
    }
   
}
// module.exports.addMovie = async (req, res) => {
//     try{
//         const categories = await Category.find({})
//         res.status(200).render('movies/add-movie',{
//             categories:categories,
//             pageTitle:'CGV Phake - Thêm phim'
//         });
//     }
//     catch(err){
//         console.log(err)
//     }
    
// }
// module.exports.postMovie = async (req, res) => {
//     var {title, actors, directors, premiere, description, time, ageAllowed, categories, languages} = req.body;
//     let imageUrl= req.file ? req.file.filename : "";
//     let values= {title, actors, directors, premiere: new Date(premiere), time, description, imageUrl, ageAllowed,categories, languages}
//     try{
//         let newMovie = new Movie(values)
//         await newMovie.save();
//     }
//     catch(err){
//         console.log(err)
//     }
//     res.redirect('/movies')
   
// }
// module.exports.editMovie = async (req, res) => {
//     var id = req.params.id;
//     try{
//         const categories = await Category.find({});
//         const movie = await Movie.findOne({_id:id});
//         var premiere = convertToYYYYMMDD(movie.premiere)
//         res.status(200).render('movies/edit-movie', {
//           movie:movie,
//           premiere,
//           categories:categories,
//           pageTitle:'CGV Phake - Chỉnh sửa'
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
// }
// module.exports.postEditMovie = async (req, res) => {
//     try{
//         var id = req.body.id;
//         var {title, actors, directors, premiere, description, showhide, time, ageAllowed, categories, languages, showhide} = req.body;
//         let imageUrl= req.file ? req.file.filename : "";
//         if(imageUrl!==''){
//             var values= {title, actors, directors, premiere, time, description, showhide, imageUrl, ageAllowed,categories, languages}
//         }else  var values= {title, actors, directors, premiere, time, description, showhide, ageAllowed,categories, languages}
//             await Movie.findOneAndUpdate({_id:id}, values, function(err, data){
//                 if(err) console.log(err)
//                 res.redirect('/movies')
//             })
//     }
//     catch(err){
//         console.log(err)
//     }
   
    
   
// }
module.exports.redirectMovies = (req, res) =>{
    res.status(200).redirect('/movies')
}
module.exports.showMoviesByCategory = (req,res) =>{
        Category.find({})
        .then(categories=>{
          Movie.find({categories:req.params.value})
          .then((data) =>{
                if(data.length<1){
                res.status(200).render('movies/notFoundMovie',{
                    pageTitle:'Không tìm thấy phim'
                });
                return;
                }
              res.status(200).render('movies/showByCategory',{
                  movies: data,
                  categories:categories,
                  pageTitle:'Thể loại'
              });
          })
          .catch((err)=>{
            console.log(err)
          });
        })
          
  }

