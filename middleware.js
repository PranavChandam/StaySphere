const Listing = require('./models/listing.js');
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


module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing.owner.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that!');
        return res.redirect(`/listing/${id}`);
    }
    next();
};
