const express= require('express')
const app= express()
const mongoose= require('mongoose')
const port= 8080
const path= require('path')
const methodOverride= require('method-override')
const ejsMate= require('ejs-mate')
const ExpressError= require('./utils/ExpressError.js')

const listings=require('./routes/listing.js')
const reviews=require('./routes/review.js')

app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
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


app.use('/listing',listings)
app.use('/listing/:id/reviews',reviews)


app.all(/.*/,(req,res,next)=>{
    next(new ExpressError(404,"Page not found"))
})

app.use((err,req,res,next)=>{
    //res.send("Something Went Wrong !")
    let {status=500,message="Something Went wrong"}= err
    // res.status(status).send(message)
    res.render('Error.ejs',{message})
})