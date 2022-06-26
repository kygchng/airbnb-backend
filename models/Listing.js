const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    name: String,
    image: String, 
    description: String,
    price: Number,
    owner: String
})

module.exports = mongoose.model("Listing", ListingSchema);