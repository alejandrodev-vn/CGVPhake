const { connection } = require('../database');
const User = require('../models/users.model');

module.exports.requireAuth = async (req, res, next) =>{
    try{
        if(!req.session.loggedIn){
            res.redirect('/auth/login')
            return
        }
        const user = await User.findOne({_id:req.session.userId})
        if(!user){
            res.redirect('/auth/login')
            return
        }
        next()
    }
    catch(err){
        console.log(err)
    }
}
