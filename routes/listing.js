const express=require('express')
const router =express.Router()
const wrapAsync=require('../utils/wrapAsync.js')
const ExpressError= require('../utils/ExpressError.js')
const {listingSchema}=require('../schema.js')
const Listing = require('../models/listing.js')


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(", ") || "Validation failed";
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//index route
router.get("/", wrapAsync(async(req,res)=>{
   const allListing= await Listing.find({})
   res.render('listings/index.ejs', { allListing });

}))

//New route
router.get('/new',(req,res)=>{
   res.render('listings/new.ejs')
})


router.post('/',validateListing, wrapAsync( async(req,res,next)=>{
    
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for Listing")
    // }
    //let listing = req.body.listing
    let result=listingSchema.validate(req.body)    //Joi validation
    console.log(result)
    if(result.error){
        throw new ExpressError(400,result.error)
    }
   const newListing = new Listing( req.body.listing) // New Methods
     await newListing.save()
     res.redirect('/listing')
   
}))

//show route
router.get('/:id', wrapAsync(async(req,res)=>{
    let {id}= req.params
    let listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs',{listing})
}))

//edit route
router.get('/:id/edit',wrapAsync( async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render('listings/edit.ejs',{listing})
}))

//update route
router.put('/:id',validateListing, wrapAsync( async (req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`)
}))

//Delete route
router.delete("/:id",wrapAsync( async (req,res)=>{
    let {id}= req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/listing')
}))


module.exports=router