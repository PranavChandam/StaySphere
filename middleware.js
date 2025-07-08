module.exports.isLoggedIn= (req,res,next)=>{
     if(!req.isAuthenticated()){
       req.session.redirectUrl=req.originalUrl
       req.flash('error','You must be logged In First')
       return res.redirect('/login')   //return require when you send twice responce
    }
    next()
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next()
}