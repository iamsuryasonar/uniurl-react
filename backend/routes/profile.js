const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");
const { upload, uploadTos3, deleteS3Object } = require('./../middleware/multerConfig');
const fs = require('fs');

const sharp = require('sharp');



// retrieve profile info
router.get("/profile-info", verify, async (req, res) => {
    try {
        let userdata = await User.findById({ _id: req.user._id }).select('-password');

       return res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });

    } catch (err) {
       return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});


router.post('/profile-upload', verify, upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    const image = req?.files['file'][0];
    try {
        // convert to webp with quality 20%
        const webpImageBuffer = await sharp(image.buffer)
            .webp([{ near_lossless: true }, { quality: 20 }])
            .toBuffer();

        let uploadedImageInfo;
        await uploadTos3(webpImageBuffer).then((result) => {
            uploadedImageInfo = result;
        })

        const user = await User.findById({ _id: req.user._id })
        if (user.picture !== '' || user.picture !== null) {
            await deleteS3Object(user?.picture?.fileName).then((result) => {
                console.log('deleted thumbnail', result);
            })
        }
        user.picture = {
            url: uploadedImageInfo.url,
            fileName: uploadedImageInfo.fileName,
        }


        await user.save();

        const userdata = await User.findById({ _id: req.user._id }).select('-password');
        return  res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
})

// add status and bio
router.put("/status_and_bio", verify, async (req, res) => {
    try {

        const user = await User.findById({ _id: req.user._id })
        if (req?.body?.bio) {
            user.bio = req.body.bio;
        }
        await user.save();
        const userdata = await User.findById({ _id: req.user._id }).select('-password');

        return res.status(200).json({ success: true, message: 'Profile retrieved successfully', data: userdata });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

// retrieve usernames for searchbar suggestions
router.get("/keyword/:keyword", async (req, res) => {
    try {
        const similarUsers = await User.find({
            name: { $regex: new RegExp(`${req?.params?.keyword}`, 'i') },
        }).select('-password').limit(5);

        return res.status(200).json({ success: true, message: 'Username retrieved successfully', data: similarUsers });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
