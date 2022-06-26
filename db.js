const mongoose = require("mongoose");

const URI = "mongodb+srv://kylie:hello123@cluster0.vgsmc.mongodb.net/airbnb?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("MongoDB is successfully connected!");
}

module.exports = connectDB;