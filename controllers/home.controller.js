const {connection} = require('../database')
const Movie = require('../models/movies.model')
const Category = require('../models/categories.model')
module.exports.homeController = async (req, res) =>{
  try{
    const categories = await Category.find({});
    const movies = await Movie.find({});
    res.status(200).render('home', {
      movies:movies,
      categories:categories,
      pageTitle:'CGV Phake - Trang chủ'
    })
  }
  catch(err){
    console.log(err)
  }
}