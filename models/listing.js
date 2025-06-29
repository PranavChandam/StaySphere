// const mongoose= require('mongoose')
// const Schema= mongoose.Schema
// const DEFAULT_IMAGE = "https://unsplash.com/photos/sunset-over-the-horizon-xP_AGmeEa6s";

// const listingSchema= new Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String
//     },
//     // image:{
//     //     default:"https://unsplash.com/photos/sunset-over-the-horizon-xP_AGmeEa6s",
//     //     type:String,
//     //     set: (v)=> v==="" ? "https://unsplash.com/photos/sunset-over-the-horizon-xP_AGmeEa6s" : v,
//     // },
//     image: {
//     type: String,
//     default: DEFAULT_IMAGE,
//     set: (v) => {
//       if (!v || v.trim() === "") {
//         return DEFAULT_IMAGE;
//       }
//       return v;
//     }
//     },

//     price:{
//         type:Number
//     },
//     location:{
//         type:String
//     },
//     country:{
//         type:String
//     }
// })

// const Listing = mongoose.model("Listing",listingSchema)
// module.exports=Listing

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb"; // Replace with any valid fallback image

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: DEFAULT_IMAGE
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

listingSchema.pre('save', function (next) {
    if (!this.image || this.image.trim() === "") {
        this.image = DEFAULT_IMAGE;
    }
    next();
});

listingSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update && update.image !== undefined && update.image.trim() === "") {
        update.image = DEFAULT_IMAGE;
        this.setUpdate(update);
    }
    next();
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
