const express= require('express')
const app= express()
const mongoose= require('mongoose')
const port= 8080
const path= require('path')
const Listing = require('./models/listing.js')
const methodOverride= require('method-override')
const ejsMate= require('ejs-mate')

app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate)

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
app.get("/listing", async(req,res)=>{
   const allListing= await Listing.find({})
   res.render('listings/index.ejs', { allListing });

})

//New route
app.get('/listing/new',(req,res)=>{
   res.render('listings/new.ejs')
})


app.post('/listing', async(req,res)=>{
    //let listing = req.body.listing
   const newListing = new Listing( req.body.listing) // New Methods
     await newListing.save()
     res.redirect('/listing')
})

//show route
app.get('/listing/:id',async(req,res)=>{
    let {id}= req.params
    let listing = await Listing.findById(id)
    res.render('listings/show.ejs',{listing})
})

//edit route
app.get('/listing/:id/edit', async (req,res)=>{
    let {id} = req.params
    let listing = await Listing.findById(id)
    res.render('listings/edit.ejs',{listing})
})

//update route
app.put('/listing/:id', async (req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`)
})

//Delete route
app.delete("/listing/:id",async (req,res)=>{
    let {id}= req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/listing')
})
