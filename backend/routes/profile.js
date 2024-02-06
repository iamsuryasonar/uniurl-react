const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { upload, uploadTos3, deleteS3Object } = require('./../middleware/multerConfig');

const sharp = require('sharp');

// retrieve profile info
router.get("/profile-info", verify, async (req, res) => {
    try {
        let userdata = await User.findById({ _id: req.user._id }).select('-password');

        return res.status(200).json({ success: true, message: '', data: userdata });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

router.post('/profile-upload', verify, upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    try {
        const image = req?.files['file'][0];

        if (!req?.files['file'][0]) return res.status(400).json({ success: false, message: '' });

        // convert to webp with quality 20%
        const webpImageBuffer = await sharp(image.buffer)
            .webp([{ near_lossless: true }, { quality: 20 }])
            .toBuffer();

        let uploadedImageInfo;

        await uploadTos3(webpImageBuffer).then((result) => {
            uploadedImageInfo = result;
        })

        const user = await User.findById({ _id: req.user._id })

        if (user?.picture?.fileName !== '' || user?.picture?.fileName !== null || user?.picture?.fileName !== undefined) {
            await deleteS3Object(user?.picture?.fileName)
        }

        user.picture = {
            url: uploadedImageInfo.url,
            fileName: uploadedImageInfo.fileName,
        }

        await user.save();

        const userdata = await User.findById({ _id: req.user._id }).select('-password');
        return res.status(200).json({ success: true, message: '', data: userdata });

    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
})

// add status and bio
router.put("/status_and_bio", verify, async (req, res) => {
    try {
        if (req?.body?.bio) return res.status(400).json({ success: false, message: '' });

        const user = await User.findById({ _id: req.user._id })

        if (req?.body?.bio) {
            user.bio = req.body.bio;
        }

        await user.save();

        const userdata = await User.findById({ _id: req.user._id }).select('-password');

        return res.status(200).json({ success: true, message: '', data: userdata });
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

        return res.status(200).json({ success: true, message: '', data: similarUsers });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
