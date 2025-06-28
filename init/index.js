const mongoose= require("mongoose")
const initData =require('./data1.js')
//const Listing= require('models/listing.js')
const Listing = require("../models/listing.js");

main().then((res)=>{
    console.log('Successfully Connect')
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust')
}

const initDB= async ()=>{
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log('Data was initilize')
    console.log(initData.data)
}

initDB()