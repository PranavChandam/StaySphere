const mongoose= require("mongoose")
const data =require('./data.js')
const Listing = require('./models/listing.js')


main().then((res)=>{
    console.log('Successfully Connect')
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust')
}