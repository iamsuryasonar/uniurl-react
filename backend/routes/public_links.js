const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");

// retrieve links
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username })
        if (!user) return res.status(404).json({ success: false, message: 'user not found' });
        const links = await Link.find({ author: user._id }).exec()
        if (links.length < 1) {
            console.log('no urls found')
            return res.status(200).json({ success: true, message: 'No urls found', data: links });
        }
        res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: links });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
module.exports = router;
