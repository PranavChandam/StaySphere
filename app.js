const express= require('express')
const app= express()
const mongoose= require('mongoose')
const port= 8080
const path= require('path')
const Listing = require('./models/listing.js')
const methodOverride= require('method-override')
const ejsMate= require('ejs-mate')
const wrapAsync=require('./utils/wrapAsync.js')
const ExpressError= require('./utils/ExpressError.js')
const {listingSchema}=require('./schema.js')

app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate)
app.use(express.json());


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

app.get('/',(req,res)=>{ 
    res.send("Hii")
})

main().then(()=>{
    console.log("Connect Successfully")
})
.catch((err)=>{
    console.log(err)
})


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

// app.get("/testListing", async (req,res)=>{
//     const sampleListing= new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing",
//         price: 1000,
//         location:'Goa',
//         country:'India'
//     })
    
//     await sampleListing.save()
//     console.log("sample was saved")
//     res.send('Successful testing')

// })

//index route
app.get("/listing", wrapAsync(async(req,res)=>{
   const allListing= await Listing.find({})
   res.render('listings/index.ejs', { allListing });

}))

//New route
app.get('/listing/new',(req,res)=>{
   res.render('listings/new.ejs')
})


app.post('/listing', wrapAsync( async(req,res,next)=>{
    
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
app.get('/listing/:id', wrapAsync(async(req,res)=>{
    let {id}= req.params
    let listing = await Listing.findById(id)
    res.render('listings/show.ejs',{listing})
}))

//edit route
app.get('/listing/:id/edit',wrapAsync( async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render('listings/edit.ejs',{listing})
}))

//update route
app.put('/listing/:id', wrapAsync( async (req,res)=>{
    let {id} = req.params
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for Listing")
    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`)
}))

//Delete route
app.delete("/listing/:id",wrapAsync( async (req,res)=>{
    let {id}= req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/listing')
}))

app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    //res.send("Something Went Wrong !")
    let {status=500,message="Something Went wrong"}= err
    // res.status(status).send(message)
    res.render('Error.ejs',{message})
})