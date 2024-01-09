const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
let cors = require('cors')
let multer = require('multer')
let app = express()
require('dotenv').config();

app.use(cors())

// import routes
const authRoute = require('./routes/authentication')
const linksRoute = require('./routes/links')
const publicLinksRoute = require('./routes/public_links')
const profileRoute = require('./routes/profile')


// Mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connect to the MongoDB server
mongoose.connect(process.env.DB_CONNECT, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Create a reference to the connection
const db = mongoose.connection;

// Event listeners for connection events
db.on('error', error => {
    console.error('MongoDB connection error:', error);
});
db.once('open', (error) => {
    console.log('MongoDB connection established', error);
});
db.on('disconnected', (error) => {
    console.log('MongoDB disconnected', error);
});


// middleware express.json
// Returns middleware that only parses JSON and only looks at requests
// where the Content-Type header matches the type option.
// A new body object containing the parsed data is populated on the 
// request object after the middleware (i.e. req.body), or an empty object
// ({}) if there was no body to parse, the Content-Type was not matched, 
// or an error occurred.
app.use(express.json())

// route middleware
// basically it prefix adds /api/user to the route
app.use('/api/user', authRoute)
app.use('/api/url', linksRoute)
app.use('/api/public_urls', publicLinksRoute)
app.use('/api/profile', profileRoute)
// listens to the port
app.listen(3001, console.log("server running on port 3001"))