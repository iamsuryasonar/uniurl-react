const router = require("express").Router();
const User = require("../model/User");
const Link = require("../model/Link");
const { redis } = require('../services/redis');

// retrieve links
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username }).populate(['theme', 'links']).select('-password').exec();
        if (!user) return res.status(404).json({ success: false, message: 'User ' + req.params.username + ' not found!' });

        const cachedData = await redis.get('userlink:'+req.params.username);
        if (cachedData) return res.status(200).json({ success: true, message: 'Urls retrieved successfully!!!', data: JSON.parse(cachedData) });

        // expires in 30 seconds 
        redis.set('userlink:' + req.params.username, JSON.stringify(user), "EX", 12 * 60 * 60);

        return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: user });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
