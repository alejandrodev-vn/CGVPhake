const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middlewares/auth.middleware')


const controllerAuthentication = require('../controllers/authentication.controller')
router.get('/auth/login', controllerAuthentication.login);
router.post('/auth/login', controllerAuthentication.postLogin);
router.get('/auth/signup', controllerAuthentication.signup);
router.post('/auth/signup', controllerAuthentication.postSignup);

router.get('/auth/:id', middlewareAuth.requireAuth, controllerAuthentication.profile);
router.post('/auth/:id', middlewareAuth.requireAuth, controllerAuthentication.editProfile);


module.exports = router;