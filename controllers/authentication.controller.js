const { connection } = require('../database');
const User = require('../models/users.model')

module.exports.signup = (req, res) => {
    if(!req.session.loggedIn){
        res.status(200).render('users/signup',{pageTitle:'CGV Phake - Đăng ký',message:''});
        return;
    }else{
        res.redirect(`/auth/${req.session.userId}`)
    }
}
module.exports.postSignup = async (req, res) => {
    const bcrypt = require("bcrypt");      
    var salt = bcrypt.genSaltSync(10);
    const fullname = req.body.fullname
    const email = req.body.email
    const birthday = req.body.birthday
    const username = req.body.username
    const password = req.body.password
    const phoneNumber = req.body.phoneNumber
    const city = req.body.city
    const favourite = req.body.favourite
    const sex = req.body.sex

    const passwordHashed = bcrypt.hashSync(password, salt);
    try{
        let newUser = new User({
            fullname:fullname,
            email:email,
            birthday:birthday,
            username:username,
            password:passwordHashed,
            phoneNumber:phoneNumber,
            city:city,
            favourite:favourite,
            sex:sex
        })
        await newUser.save();
    }
    catch(err){
        console.log(err)
    }
   res.status(200).redirect('/auth/formAuth')
}
module.exports.login = (req, res) => {
    if(!req.session.loggedIn){
        res.status(200).render('users/login',{pageTitle:'CGV Phake - Đăng nhập',message:''});
        return;
    }else{
        res.redirect(`/auth/${req.session.userId}`)
    }
}
module.exports.postLogin = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    try{
        const user = await User.findOne({username:username})
        if(!user){
            res.render('users/login',{pageTitle:'CGV Phake - Đăng nhập',message:'Tài khoản không tồn tại'})
        }else {
            const bcrypt = require("bcrypt");        
            const password_db = user.password
            const passwordCompared = bcrypt.compareSync(password, password_db)
            if(!passwordCompared){
                res.render('users/login',{pageTitle:'CGV Phake - Đăng nhập',message:'Sai mật khẩu'})
            }else {
                var sess = req.session; 
                sess.loggedIn = true
                sess.userId = user._id
                res.status(200).redirect('/')
            }
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.profile = async (req, res) => {
    try{
        res.status(200).render('users/profile',{
            pageTitle:'CGV Phake - Thông tin tài khoản'
        });
    }
    catch(err){
        console.log(err)
    }
}
module.exports.editProfile = async (req, res) => {
    try{
        if(!req.session.loggedIn){
            res.redirect('/auth/login')
            return
        }
        const userId  = req.params.id
        const fullname = req.body.fullname
        const city = req.body.city
        const birthday = req.body.birthday
        const favourite = req.body.favourite
        const sex = req.body.sex

        const phoneNumber = req.body.phoneNumber
        if(!req.body.passwordOld && !req.body.passwordNew){
            const userUpdate = await User.findByIdAndUpdate(
                userId,
                {
                    fullname:fullname,
                    city:city,
                    phoneNumber:phoneNumber,
                    birthday:birthday,
                    favourite:favourite,
                    sex:sex
                })
            res.redirect(`/auth/${req.session.userId}`)
            return
        }else{
            const user = await User.findOne({_id:userId})
            const passwordOld = req.body.passwordOld
            const passwordNew = req.body.passwordNew
            const bcrypt = require("bcrypt");        
            const password_db = user.password
            const passwordCompared = bcrypt.compareSync(passwordOld, password_db)
            if(!passwordCompared){
                res.redirect(`/auth/${req.session.userId}`)
                return
            }else{
                var salt = bcrypt.genSaltSync(10);
                const passwordHashed = bcrypt.hashSync(passwordNew, salt);
                const userUpdate = await User.findByIdAndUpdate(
                    userId,
                    {
                        fullname:fullname,
                        city:city,
                        phoneNumber:phoneNumber,
                        birthday:birthday,
                        favourite:favourite,
                        sex:sex,
                        password:passwordHashed
                    })
                res.clearCookie('sessionId', { path: '/' })
                res.redirect(`/auth/login`)
            }
        }
        
    }
    catch(err){
        console.log(err)
    }
}
