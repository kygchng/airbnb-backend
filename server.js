const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./db");
const consumer = require("./routes/api/consumer");

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false })); //takes in network request and turns it into a JSON
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * = give access to anyone (front end app) who calls backend
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE'); // these requests are allowed
    next();
});

app.use(morgan("dev"));
app.use(helmet());
connectDB();
app.use("/api/v1/consumer", consumer);

// http://localhost:5000/api/v1/consumer/register/owner
// http://localhost:5000/api/v1/consumer/create/listing
// http://localhost:5000/api/v1/consumer/fetch/listings/:name


app.listen(port, () => console.log(`API server listening on ${port}`));

