const mongoose = require('mongoose');
const Review = require('./review');
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
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
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

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
      await Review.deleteMany({_id:{$in: listing.reviews}})
    }
    
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
