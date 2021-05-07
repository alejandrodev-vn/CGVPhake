const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const nodemailer =  require('nodemailer'); 
const fileUpload = require('express-fileupload')

/* Router */
const homeRouter = require('./routes/home.route');
const moviesRouter = require('./routes/movies.route');
const cinemasRouter = require('./routes/cinemas.route');
const bookingRouter = require('./routes/booking.route');
const authenticationRouter = require('./routes/authentication.route');


const adminRouter = require('./routes/admin.route');

/* set */
app.set('views','./views');
app.set('view engine','ejs');
app.set("layout admin", false);
/* use */        
app.use(fileUpload());
app.use(express.static('public'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/images',express.static(__dirname + '/public/images'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use(cookieParser('fptpolytechnichcmntthps12133zx3c4z65as5'))
app.use(
    session({
    secret: 'fptpolytechnichcmntthps12133zx3c4z65as5',
    name:'sessionId',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
  }));
app.use(express.urlencoded({
    extended:true
}))
app.use(expressLayouts);
app.use(async (req, res, next) =>{
    try{
        const { connection } = require('./database');
        const User = require('./models/users.model')
        const { userId } = req.session
        if(userId){
            res.locals.user = await User.findOne({_id:userId})                               
        }
        next()
    }
    catch(err){
        console.log(err)
    }
    
})
app.use('/', homeRouter)
app.use(moviesRouter);
app.use(cinemasRouter);
app.use(bookingRouter);
app.use(authenticationRouter);

app.use('/admin',adminRouter);

app.get('*',function(req, res, next) {
   res.render('notFound',{
       pageTitle:'Không tìm thấy trang'
   })
  });
const port = 3000;
app.listen(port, () => console.log(`App is listening on port ${port}`));

