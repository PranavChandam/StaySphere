const express=require('express')
const router =express.Router()
const User=require('../models/user.js')
const wrapAsync = require('../utils/wrapAsync.js')
const passport = require('passport')
const { saveRedirectUrl } = require('../middleware.js')


router.get('/signup',(req,res)=>{
    res.render("users/signup.ejs")
})

router.post("/signup",wrapAsync( async(req,res)=>{
  try{
    let {username,email,password}=req.body
    const newUser= new User({username,email})
    const registerUser= await User.register(newUser,password)
    req.login(registerUser,(err)=>{    //auto login after signup by using login()  (new user)
      if(err){
        return next(err)
      }
    req.flash('success',"User Register Successfully")
    res.redirect('/listing')
    })
  }
  catch(err){
    req.flash('error',err.message)
    res.redirect('/signup')
  }
}))


router.get('/login',(req,res)=>{
    res.render('users/login.ejs')
})

router.post("/login",saveRedirectUrl,
    passport.authenticate("local",{failureRedirect: '/login',failureFlash:true}), //middleware for authentication
    async(req,res)=>{
      req.flash("success","Welcome Back To WanderLust")
      let redirectUrl=res.locals.redirectUrl || "/listing"
      res.redirect(redirectUrl)
})

router.get('/logout',(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
       return next(err)
    }
  })
  req.flash('Success',"Logged Out Successfully")
  res.redirect('/listing')
})

module.exports=router