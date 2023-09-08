const router = require('express').Router()
const User = require('../model/User')
const Joi = require('joi')
const { registerValidation, loginValidation } = require('../middleware/authValidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utility')

router.post('/register', async (req, res) => {
    if (!req.body.name) return res.status(400).json({ success: false, message: 'name required!!!' });
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });
    //validate the data before saving to database
    const { error } = registerValidation(req.body)
    if (error) return utils.responseHandler(res, 400, 'error', error.details[0].message, null);


    //check if email exists in the database
    const emailExist = await User.findOne({ email: req.body.email })

    if (emailExist) return utils.responseHandler(res, 400, 'error', 'Email already exists', null);
    // if (emailExist) return res.status(400).json({ error: 'Email already exists' });


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
        // res.json({ message: 'User registered successfully' });
        utils.responseHandler(res, 201, 'success', 'User registered successfully', null);
    } catch (error) {
        // res.status(500).json({ error: 'An error occurred' });
        utils.responseHandler(res, 500, 'error', 'An error occurred', null);
    }
})

router.post('/login', async (req, res) => {
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });

    // validate the data before saving to database
    const { error } = loginValidation(req.body)
    if (error) return utils.responseHandler(res, 400, 'error', error.details[0].message, null);
    // check if email exists in the database and get the user's password(data) so that we can compare hashes
    const user = await User.findOne({ email: req.body.email })
    if (!user) return utils.responseHandler(res, 400, 'error', 'Email not found', null);

    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched) return utils.responseHandler(res, 400, 'error', 'Invalid Password', null);

    // create token using jsonwebtoken library
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    const userData = await User.findOne({ email: req.body.email })
    const userinfo = {
        'name': userData.name,
        'email': userData.email,
    }
    const response = { ...userinfo, token }
    utils.responseHandler(res, 200, 'success', 'User logged in successfully', response);
})

router.post('/verifyToken', async (req, res) => {
    console.log(req.body)
    if (!req.body.token) {
        return utils.responseHandler(res, 400, 'error', 'Token required', null);
    }

    const verified = await jwt.verify(req?.body?.token, process.env.TOKEN_SECRET)
    if (verified) {
        return utils.responseHandler(res, 200, 'success', 'Valid token', { token: req.body.token });
    }
    return utils.responseHandler(res, 404, 'error', 'Invalid token', null);
})


module.exports = router