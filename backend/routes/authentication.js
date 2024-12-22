const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../middleware/authValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../utility');
const axios = require('axios');
const { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_MAX_AGE } = require('../constants/token');

router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if (!username) return res.status(400).json({ success: false, message: 'username required' });
        if (!email) return res.status(400).json({ success: false, message: 'email required' });
        if (!password) return res.status(400).json({ success: false, message: 'password required' });

        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message, data: null });

        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) return res.status(400).json({ success: false, message: 'Email already exists', data: null });

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const savedUser = await user.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: savedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: savedUser
        });
    }
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ success: false, message: 'email required' });
        if (!password) return res.status(400).json({ success: false, message: 'password required' });

        const { error } = loginValidation(req.body)
        if (error) return res.status(400).json({ success: false, message: error.details[0].message, data: null });

        const existingUser = await User.findOne({ email: email }).select('+password');
        if (!existingUser) return utils.responseHandler(res, 400, 'error', 'Email not found', null);

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ success: false, message: 'Invalid password', data: null });

        const payload = {
            _id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        };

        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY,
            }
        );

        const refreshToken = jwt.sign(
            payload,
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRY,
            }
        );

        res.cookie(
            'refreshToken',
            refreshToken,
            {
                maxAge: REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
                sameSite: 'Strict',
                // secure: false,
            }
        );

        const response = {
            token: accessToken,
        };

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: response
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: null
        });
    }
})

router.post('/google_login', async (req, res) => {

    try {
        const { code } = req.body;

        if (!code) return res.status(400).json({ success: false, message: 'Access token required' });

        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const { id_token } = tokenResponse.data;

        const decodedToken = jwt.decode(id_token);

        let user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            user = new User(
                {
                    username: utils.getRandomUsername(),
                    email: decodedToken.email,
                    googleId: decodedToken.sub,
                }
            )
            user = await user.save();
        }

        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        };

        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY,
            }
        );

        const refreshToken = jwt.sign(
            payload,
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: REFRESH_TOKEN_EXPIRY,
            }
        );


        res.cookie(
            'refreshToken',
            refreshToken,
            {
                maxAge: REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
                sameSite: 'Strict',
                // secure: false,
            }
        );

        const response = {
            token: accessToken,
        };

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: response
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: null
        });
    }
})

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) return res.status(401).json({ success: false, message: 'Unauthorised!', data: null });

        jwt.verify(refreshToken,
            REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "Unauthorized!",
                    });
                }

                const payload = {
                    _id: decoded._id,
                    email: decoded.email,
                    username: decoded.username,
                }

                const accessToken = jwt.sign(
                    payload,
                    ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: ACCESS_TOKEN_EXPIRY,
                    }
                );

                const response = {
                    token: accessToken,
                };

                return res.status(200).json({
                    success: true,
                    message: 'New refresh token generated',
                    data: response,
                });
            });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
})

module.exports = router