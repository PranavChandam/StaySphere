const Listing = require('./models/listing.js');
const Review= require("./models/review.js")
const ExpressError= require('./utils/ExpressError.js')
const {listingSchema}=require('./schema.js')
const {reviewSchema}=require('./schema.js')

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

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ") || "Validation failed";
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error?.details?.map(el => el.message).join(", ") || "Validation failed";
        throw new ExpressError(400, errMsg);
    }

    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that!');
        return res.redirect(`/listing/${id}`);
    }
    next();
};