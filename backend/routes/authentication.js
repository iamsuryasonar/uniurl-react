const router = require('express').Router();
const User = require('../model/User');
const Joi = require('joi');
const { registerValidation, loginValidation } = require('../middleware/authValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utility');
const axios = require('axios');
router.post('/register', async (req, res) => {
    if (!req.body.name) return res.status(400).json({ success: false, message: 'name required!!!' });
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });
    //validate the data before saving to database
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, data: null });


    //check if email exists in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ success: false, message: 'Email already exists', data: null });


    // hash password using bcrypt 
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    //calling User construction to create a new user with type User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        // Mongoose provides a save function that will take a JSON 
        // object and store it in the database. Our body-parser (in our case express.json) middleware,
        // will convert the user’s input into the JSON format for us.

        const savedUser = await user.save();
        return res.status(201).json({ success: true, message: 'User registered successfully', data: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.post('/login', async (req, res) => {
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });

    try {
        // validate the data before saving to database
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).json({ success: false, message: error.details[0].message, data: null });
        // check if email exists in the database and get the user's password(data) so that we can compare hashes
        const user = await User.findOne({ email: req.body.email })
        if (!user) return utils.responseHandler(res, 400, 'error', 'Email not found', null);

        const matched = await bcrypt.compare(req.body.password, user.password);
        if (!matched) return res.status(400).json({ success: false, message: 'Invalid password', data: null });

        // create token using jsonwebtoken library
        const token = jwt.sign({ _id: user._id, username: user.name }, process.env.TOKEN_SECRET)
        
        const userinfo = {
            'name': user.name,
            'email': user.email,
        }
        const response = { ...userinfo, token }
        return res.status(200).json({ success: true, message: 'User logged in successfully', data: response });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Interal server error', data: null });
    }
})

router.post('/google_login', async (req, res) => {
    if (!req.body.code) return res.status(400).json({ success: false, message: 'access token required!!!' });

    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code: req.body.code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const { id_token } = tokenResponse.data;

        const decodedToken = jwt.decode(id_token);

        // check if email exists in the database and get the user's password(data) so that we can compare hashes
        let user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            // create a user
            user = new User({
                name: decodedToken.name,
                email: decodedToken.email,
                googleId: decodedToken.sub
            })
            user = await user.save();
        }

        // create token using jsonwebtoken library
        const token = jwt.sign({ _id: user._id, username: user.name }, process.env.TOKEN_SECRET)

        const userinfo = {
            'name': user.name,
            'email': user.email,
        }
        const response = { ...userinfo, token }
        return res.status(200).json({ success: true, message: 'User logged in successfully', data: response });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Interal server error', data: null });
    }
})

router.post('/verifyToken', async (req, res) => {
    if (!req.body.token) return res.status(400).json({ success: false, message: 'Token required', data: null });

    const verified = await jwt.verify(req?.body?.token, process.env.TOKEN_SECRET)

    if (verified) return res.status(200).json({ success: true, message: 'OK', data: { token: req.body.token } });
    return res.status(400).json({ success: false, message: 'Invalid token', data: null });
})


module.exports = router