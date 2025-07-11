const Listing= require("../models/listing.js")
const Review= require("../models/review.js")
//create Review
module.exports.createReview=async(req,res)=>{
   let listing= await Listing.findById(req.params.id)
   let newReview= new Review(req.body.review)
   newReview.author=req.user._id
   console.log(newReview)
   listing.reviews.push(newReview._id); 


   await newReview.save()
   await listing.save()
  req.flash("success","New Review Created!")
  res.redirect(`/listing/${listing.id}`)
}

module.exports.destroyReview=async(req,res)=>{
   let {id,reviewId}=req.params

   await Listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId} })
   await Review.findByIdAndDelete(reviewId)
   req.flash("success","Review Deleted!")
   res.redirect(`/listing/${id}`)
}