const Listing = require('../models/listing.js')

//index
module.exports.index=async(req,res)=>{
   const allListing= await Listing.find({})
   res.render('listings/index.ejs', { allListing });
}

//new
module.exports.renderNewForm=(req,res)=>{
   res.render('listings/new.ejs')
}

//show
module.exports.showListing=async(req,res)=>{
    let {id}= req.params
    let listing = await Listing.findById(id).populate({path:'reviews',
     populate:{
        path:'author'
     }
    }).populate('owner')
    if(!listing){
        req.flash("error","Listing Does Not Existed!")
       return res.redirect("/listing")
    }
    res.render('listings/show.ejs',{listing})
}

//create
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path
    let filename=req.file.filename
   const newListing = new Listing( req.body.listing) // New Methods
    newListing.owner=req.user._id
    newListing.image={url,filename}
     await newListing.save()
     req.flash("success","New Listing Created!")
     res.redirect('/listing')
   
}

//edit
module.exports.renderEditForm=async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","Listing Does Not Existed!")
       return res.redirect("/listing")
    }
    let originalImageUrl = listing.image.url;

//     originalImageUrl = originalImageUrl.replace(
//    '/upload',
//    '/upload/w_250,h_250,c_fill,e_blur:300'
//     );

    
    res.render('listings/edit.ejs',{listing,originalImageUrl})
}

//update
module.exports.updateListing= async (req,res)=>{

    let {id} = req.params
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file !=="undefined"){
    let url=req.file.path
    let filename=req.file.filename
    listing.image={url,filename}
    await listing.save()
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listing/${id}`)
}

//delete
module.exports.deleteListing= async (req,res)=>{
    let {id}= req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing Deleted...")
    res.redirect('/listing')
}