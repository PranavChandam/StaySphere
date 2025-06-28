const express= require('express')
const app= express()
const mongoose= require('mongoose')
const port= 8080
const Listing = require('./models/listing.js')

app.set('view engine','ejs')

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

app.get("/testListing", async (req,res)=>{
    const sampleListing= new Listing({
        title: "Sample Listing",
        description: "This is a sample listing",
        price: 1000,
        location:'Goa',
        country:'India'
    })
    
    await sampleListing.save()
    console.log("sample was saved")
    res.send('Successful testing')

})