const mongoose= require('mongoose')
const Schema= mongoose.Schema

const listingSchema= new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    image:{
        default:"https://unsplash.com/photos/sunset-over-the-horizon-xP_AGmeEa6s",
        type:String,
        set: (v)=> v==="" ?"https://unsplash.com/photos/sunset-over-the-horizon-xP_AGmeEa6s" : v,
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
})

const Listing = mongoose.model("Listing",listingSchema)
module.exports=Listing