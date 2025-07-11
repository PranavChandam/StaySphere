const User=require('../models/user.js')

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
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
}

module.exports.renderLoginForm=(req,res)=>{
    res.render('users/login.ejs')
}

module.exports.login= async(req,res)=>{
      req.flash("success","Welcome Back To WanderLust")
      let redirectUrl=res.locals.redirectUrl || "/listing"
      res.redirect(redirectUrl)
}

module.exports.logout=(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
       return next(err)
    }
  })
  req.flash('Success',"Logged Out Successfully")
  res.redirect('/listing')
}
