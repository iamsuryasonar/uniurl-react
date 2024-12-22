const router = require("express").Router();
const User = require("../model/User");
const Link = require("../model/Link");
const { redis } = require('../services/redis');
let themes = require('../themeData.json')

// retrieve links
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ success: false, message: 'User ' + req.params.username + ' not found!' });

        const links = await Link.find({ author: user._id });

        let data = {
            _id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            location: user.location,
            picture: {
                url: user.picture.url,
            },
            theme: themes[`${user.theme}`],
            links: links,
        }

        // const cachedData = await redis.get('userlink:'+req.params.username);
        // if (cachedData) return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: JSON.parse(cachedData) });

        // expires in 30 seconds 
        redis.set('userlink:' + req.params.username, JSON.stringify(data), "EX", 12 * 60 * 60);

        return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: data });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
