const express= require('express')
const app= express()
const mongoose= require('mongoose')
const port= 8080
const path= require('path')
const methodOverride= require('method-override')
const ejsMate= require('ejs-mate')
const ExpressError= require('./utils/ExpressError.js')
const session=require("express-session")
const flash=require("connect-flash")

const listings=require('./routes/listing.js')
const reviews=require('./routes/review.js')

app.set('view engine','ejs')
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate)

const sessionOptions={
    secret:"SuperSecretPranav",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 7*24 *60 *60 *1000,
        maxAge:7*24 *60 *60 *1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions))
app.use(flash())


app.use((req,res,next)=>{
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})

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