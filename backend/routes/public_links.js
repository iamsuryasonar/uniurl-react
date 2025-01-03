const router = require("express").Router();
const User = require("../model/User");
const { redis } = require('../services/redis');
let themes = require('../themeData.json');

// retrieve links
router.get("/:username", async (req, res) => {
    try {

        const cachedData = await redis.get('userlink:' + req.params.username);
        if (cachedData) return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: JSON.parse(cachedData) });

        const result = await User.aggregate([
            { $match: { username: req.params.username } },
            {
                $lookup: {
                    from: 'links',
                    localField: '_id',
                    foreignField: 'author',
                    as: 'links',
                },
            },
            {
                $project: {
                    password: 0,
                },
            },
            {
                $addFields: {
                    links: { $sortArray: { input: "$links", sortBy: { order: 1 } } },
                },
            },
        ]);

        if (result.length === 0) return res.status(404).json({ success: false, message: 'User ' + req.params.username + ' not found!' });

        result[0].theme = themes[`${result[0].theme}`];

        redis.set('userlink:' + req.params.username, JSON.stringify(result[0]), "EX", 10 * 24 * 3600); // in seconds

        return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: result[0] });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
