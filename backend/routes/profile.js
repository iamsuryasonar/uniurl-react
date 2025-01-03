const router = require("express").Router();
const sharp = require('sharp');
const { verify } = require("../middleware/verifyToken");
const { upload, uploadTos3, deleteS3Object } = require('./../middleware/multerConfig');
const { redis } = require('../services/redis');
const User = require("../model/User");

// retrieve profile info
router.get("/profile-info", verify, async (req, res) => {
    try {
        let user = await User.findById({ _id: req.user._id });

        return res.status(200).json({ success: true, message: '', data: user });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

router.post('/profile-upload', verify, upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    try {
        const image = req?.files['file'][0];

        if (!req?.files['file'][0]) return res.status(400).json({ success: false, message: '' });

        const [webpImageBuffer, user] = await Promise.all([
            await sharp(image.buffer) // convert to webp with quality 20%
                .webp([{ near_lossless: true }, { quality: 20 }])
                .toBuffer(),
            await User.findById({ _id: req.user._id })
        ])

        let uploadedImageInfo;

        await uploadTos3(webpImageBuffer).then((result) => {
            uploadedImageInfo = result;
        })

        if (user?.picture && user?.picture?.fileName) {
            await deleteS3Object(user?.picture?.fileName);
        }

        user.picture = {
            url: uploadedImageInfo.url,
            fileName: uploadedImageInfo.fileName,
        }

        let updatedUser = await user.save();

        // invalidate cache
        redis.del('userlink:' + req.user.username);

        return res.status(200).json({ success: true, message: '', data: updatedUser });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
})

// add status and bio
router.put("/profile-info", verify, async (req, res) => {
    try {
        if (!req?.body?.bio) return res.status(400).json({ success: false, message: 'Bio is required' });

        const user = await User.findById({ _id: req.user._id });

        if (req?.body?.username) {
            user.username = req.body.username;
            user.usernameUpdated = true;
        }
        if (req?.body?.bio) {
            user.bio = req.body.bio;
        }
        if (req?.body?.theme) {
            user.theme = req.body.theme;
        }
        if (req?.body?.location) {
            user.location = req.body.location;
        }

        let updatedUser = await user.save();

        // invalidate cache
        redis.del('userlink:' + req.user.username);

        return res.status(200).json({ success: true, message: '', data: updatedUser });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

router.get("/is_username_exist/:username", async (req, res) => {
    try {

        if (!req?.params?.username) return res.status(400).json({ success: false, message: 'Username is required' });

        const user = await User.find({ username: req?.params?.username });

        if (user.length !== 0) return res.status(200).json({
            success: true, message: 'Username exist', data: {
                isExist: true,
            }
        });

        return res.status(200).json({
            success: true, message: 'Username doesnot exist', data: {
                isExist: false,
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

// retrieve usernames for searchbar suggestions
router.get("/keyword/:keyword", async (req, res) => {
    try {

        const similarUsers = await User.find({
            username: { $regex: new RegExp(`${req?.params?.keyword}`, 'i') },
        }).limit(5);

        return res.status(200).json({ success: true, message: '', data: similarUsers });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
