const express = require("express");
const app = express();

// For environment variables
const dotnev = require("dotenv");
dotnev.config();

// Enabling CORS for some specific origins only.
const cors = require("cors");
let corsOptions = {
    origin: ['http://localhost:5000'],
}
app.use(cors(corsOptions))

// For pasring JSON
app.use(express.json())

// MongoDB connection
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URL

).then(
    () => {
        console.log("DB connected successfully!");
    }
).catch(
    (error) => {
        console.log(error);
    }
)
const path = require("path")

// Static files
app.use(express.static('frontend'))

// Landing page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/landing_page/index.html'))
});

// version 1 of the api
const routerOne = express.Router();
routerOne.use('/users', require('./routes/user'));
routerOne.use('/auth', require('./routes/auth'));

// version 1 of the api
app.use('/api/v1', routerOne);

// Api listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on ${PORT}`); })