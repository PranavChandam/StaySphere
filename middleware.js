module.exports.isLoggedIn= (req,res,next)=>{
     if(!req.isAuthenticated()){
       req.flash('error','You must be logged In First')
       return res.redirect('/login')   //return require when you send twice responce
    }
    next()
}