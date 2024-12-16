const router = require("express").Router();
const { THEMES } = require("../constants/themes");

router.get("/", async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: THEMES });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

module.exports = router;
