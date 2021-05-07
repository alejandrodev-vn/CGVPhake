const express = require('express');
const router = express.Router();
var upload = require('../multer')


const controllerAdmin = require('../controllers/admin.controller')
const middlewareAuth = require('../middlewares/auth.middleware')


router.get('/',middlewareAuth.requireAuth, controllerAdmin.index);
//movie
router.get('/movie', controllerAdmin.listMovies);
router.get('/movie/new-movie', controllerAdmin.newMovie);
router.post('/movie/new-movie',upload.single('imageUrl'), controllerAdmin.postMovie);
router.get('/movie/edit/:id', controllerAdmin.editMovie);
router.post('/movie/edit/:id',upload.single('imageUrl'), controllerAdmin.postEditMovie);
router.get('/movie/delete/:id', controllerAdmin.deleteMovie);
router.get('/movie/:id', controllerAdmin.showingMovie);

//category
router.get('/category', controllerAdmin.listCategories);
router.get('/category/new-category', controllerAdmin.addCategory);
router.post('/category/new-category', controllerAdmin.postCategory);
router.get('/category/edit/:id', controllerAdmin.editCategory);
router.post('/category/edit/:id', controllerAdmin.postEditCategory);
router.get('/category/delete/:id', controllerAdmin.deleteCategory);

//area
router.get('/area', controllerAdmin.listAreas);
router.get('/area/new-area', controllerAdmin.addArea);
router.post('/area/new-area', controllerAdmin.postArea);
router.get('/area/edit/:slug', controllerAdmin.editArea);
router.post('/area/edit/:slug', controllerAdmin.postEditArea);
router.get('/area/delete/:slug', controllerAdmin.deleteArea);

//cinema
router.get('/cinema', controllerAdmin.listCinemas);
router.get('/cinema/new-cinema', controllerAdmin.addCinema);
router.post('/cinema/new-cinema', controllerAdmin.postCinema);
router.get('/cinema/edit/:slug', controllerAdmin.editCinema);
router.post('/cinema/edit/:slug', controllerAdmin.postEditCinema);
router.get('/cinema/delete/:slug', controllerAdmin.deleteCinema);
router.get('/cinema/:slug', controllerAdmin.listRoom);

//room
router.get('/room', controllerAdmin.listRooms);
router.get('/room/new-room', controllerAdmin.addRoom);
router.post('/room/new-room', controllerAdmin.postRoom);
router.get('/room/edit/:id', controllerAdmin.editRoom);
router.post('/room/edit/:id', controllerAdmin.postEditRoom);
router.get('/room/delete/:id', controllerAdmin.deleteRoom);

//movie showing
router.get('/movie-showing', controllerAdmin.listMovieShowings);
router.get('/movie-showing/new-movie-showing', controllerAdmin.addMovieShowing);
router.post('/movie-showing/new-movie-showing', controllerAdmin.postMovieShowing);
router.get('/movie-showing/edit/:id', controllerAdmin.editMovieShowing);
router.post('/movie-showing/edit/:id', controllerAdmin.postEditMovieShowing);
router.get('/movie-showing/delete/:id', controllerAdmin.deleteMovieShowing);

//user
router.get('/user', controllerAdmin.listUsers);
router.post('/user/role/:id', controllerAdmin.updateRole);
router.get('/user/role/:id', controllerAdmin.role);

//send mail

router.get('/mail', controllerAdmin.mail);
router.post('/mail/sendMail', controllerAdmin.sendMail);

router.get('/test', controllerAdmin.test);




module.exports = router;