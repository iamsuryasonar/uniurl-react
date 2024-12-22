const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const responseTime = require('response-time');
const cookieParser = require('cookie-parser');

const app = express()

require('dotenv').config();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(responseTime());
app.use(cookieParser());

// import routes
const authRoute = require('./routes/authentication')
const linksRoute = require('./routes/links')
const publicLinksRoute = require('./routes/public_links')
const profileRoute = require('./routes/profile');
const themeRoute = require('./routes/theme');

// Mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
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
app.use(express.json());


// route middleware
// basically it prefix adds /api/user to the route
app.use('/api/user', authRoute)
app.use('/api/url', linksRoute)
app.use('/api/public_urls', publicLinksRoute)
app.use('/api/profile', profileRoute)
app.use('/api/theme', themeRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
    console.log("Started application on port %d", process.env.PORT);
});

module.exports = app;