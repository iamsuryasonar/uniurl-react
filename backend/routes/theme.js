const router = require("express").Router();
const Theme = require("../model/Theme");
const mongoose = require("mongoose");

// add theme
router.post("/", async (req, res) => {
    try {
        let {
            name,
            pagecontainer,
            avatarnameciocontainer,
            avatarimagecontainer,
            namebiocontainer,
            urlcardcontainer
        } = req.body;

        const theme = new Theme({
            name,
            pagecontainer,
            avatarnameciocontainer,
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

// // Update link
// router.put("/:linkid", verify, async (req, res) => {
//     if (!req.body.url) return res.status(400).json({ success: false, message: 'url required!!!' });
//     if (!req.body.title) return res.status(400).json({ success: false, message: 'title required!!!' });
//     try {
//         const doc = await Link.find({
//             _id: req.params.linkid,
//         });

//         if (doc[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });


//         if (doc[0].author._id.toString() === req.user._id) {
//             doc[0].url = req.body.url;
//             doc[0].title = req.body.title;

//             const data = await doc[0].save();

//             // invalidate cache
//             redis.del('userlink:' + req.user.username);

//             return res.status(200).json({ success: true, message: 'Url updated successfully', data: data });
//         } else {
//             return res.status(401).json({ success: false, message: 'Not authorised to update' });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ success: false, message: 'Internal server error ' });
//     }
// });

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
