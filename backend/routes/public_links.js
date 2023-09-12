const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");
const fs = require('fs');

// retrieve links
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username })
        if (!user) return res.status(404).json({ success: false, message: 'user not found' });

        const links = await Link.find({ author: user._id }).exec()


        if (user?.picture) {
            const fileData = await fs.promises.readFile(user.picture);
            const base64Data = fileData.toString('base64');
            const dataUrl = `data:image/png;base64,${base64Data}`;
            user.picture = dataUrl;
        }

        const result = {
            'picture': user.picture,
            'name': user.name,
            'status': user.status,
            'bio': user.bio,
            'links': links
        }
        if (links.length < 1) {
            console.log('no urls found')
            return res.status(200).json({ success: true, message: 'No urls found', data: result });
        }

        res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: result });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
module.exports = router;
