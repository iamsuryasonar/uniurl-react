const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");
const { upload } = require('./../middleware/multerConfig');
const fs = require('fs');



// retrieve profile info
router.get("/profile-info", verify, async (req, res) => {
    try {
        let userdata = await User.findById({ _id: req.user._id }).select('-password');

        if (userdata?.picture) {
            const fileData = await fs.promises.readFile(userdata.picture);
            const base64Data = fileData.toString('base64');
            userdata.picture = base64Data;
        }

        res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});



router.post('/profile-upload', verify, upload.single('file'), async (req, res) => {
    const filePath = req?.file?.path;
    try {
        const user = await User.findById({ _id: req.user._id })
        user.picture = filePath;
        await user.save();
        const userdata = await User.findById({ _id: req.user._id }).select('-password');
        if (userdata?.picture) {
            const fileData = await fs.promises.readFile(userdata.picture);
            const base64Data = fileData.toString('base64');
            userdata.picture = base64Data;
        }
        res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
})

// add status and bio
router.put("/status_and_bio", verify, async (req, res) => {
    // try {
        
        const user = await User.findById({ _id: req.user._id })
        if (req?.body?.bio) {
            user.bio = req.body.bio;
        }
        if (req?.body?.status) {
            user.status = req.body.status;
        }
        await user.save();
        const userdata = await User.findById({ _id: req.user._id }).select('-password');

        if (userdata?.picture) {
            const fileData = await fs.promises.readFile(userdata.picture);
            const base64Data = fileData.toString('base64');
            userdata.picture = base64Data;
        }

        res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });
    // } catch (err) {
    //     res.status(400).json({ success: false, message: err.message });
    // }
});

module.exports = router;
