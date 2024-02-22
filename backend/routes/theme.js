const router = require("express").Router();
const Theme = require("../model/Theme");
const mongoose = require("mongoose");

// add theme
router.post("/", async (req, res) => {
    try {
        let {
            name,
            pagecontainer,
            avatarnamebiocontainer,
            avatarimagecontainer,
            namebiocontainer,
            urlcardcontainer
        } = req.body;

        const theme = new Theme({
            name,
            pagecontainer,
            avatarnamebiocontainer,
            avatarimagecontainer,
            namebiocontainer,
            urlcardcontainer,
        });

        const newTheme = await theme.save();

        return res.status(200).json({ success: true, message: "Theme saved successfully!!!", data: newTheme });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

// retrieve themes
router.get("/", async (req, res) => {
    try {
        const themes = await Theme.find();
        return res.status(200).json({ success: true, message: 'themes retrieved successfully', data: themes });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Update link
router.put("/:id", async (req, res) => {
    try {

        let {
            name,
            pagecontainer,
            avatarnamebiocontainer,
            avatarimagecontainer,
            namebiocontainer,
            urlcardcontainer
        } = req.body;

        const theme = await Theme.findById({
            _id: req.params.id,
        });

        theme.name = name;
        theme.pagecontainer = pagecontainer;
        theme.avatarnamebiocontainer = avatarnamebiocontainer;
        theme.avatarimagecontainer = avatarimagecontainer;
        theme.namebiocontainer = namebiocontainer;
        theme.urlcardcontainer = urlcardcontainer;

        const updatedTheme = await theme.save();
        res.status(200).json({ success: true, message: 'themes updated successfully', data: updatedTheme });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

// // delete link
// router.delete("/:linkid", verify, async (req, res) => {
//     if (!req.params.linkid) return res.status(400).json({ success: false, message: 'url id required!!!' });
//     try {
//         const child = await Link.find({
//             _id: req.params.linkid,
//             author: req.user._id,
//         });

//         if (child[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });

//         if (child[0].author._id.toString() === req.user._id) {
//             child[0].remove();

//             // invalidate cache
//             redis.del('userlink:' + req.user.username);

//             const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
//             return res.status(200).json({ success: true, message: "Url deleted successfully!!!", data: userdata.links });
//         } else {
//             return res.status(401).json({ success: false, message: 'Not authorised to delete' });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ success: false, message: 'Internal server error ' });
//     }
// });
module.exports = router;
