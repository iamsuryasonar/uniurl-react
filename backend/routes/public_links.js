const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const fs = require('fs');

// retrieve links
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username })
        if (!user) return res.status(404).json({ success: false, message: 'User ' + req.params.username + ' not found!' });

        const links = await Link.find({ author: user._id }).exec()

        const result = {
            'picture': user.picture.url,
            'name': user.name,
            'status': user.status,
            'bio': user.bio,
            'links': links
        }

        return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: result });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});



module.exports = router;
