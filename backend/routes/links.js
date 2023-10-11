const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");

// add link
router.post("/", verify, async (req, res) => {
  try {
    if (!req.body.url) return res.status(400).json({ success: false, message: 'url required!!!' });
    if (!req.body.title) return res.status(400).json({ success: false, message: 'title required!!!' });

    let url = req.body.url;

    url = url.trim();
    if (url.substr(0, 3) === "www") {
      url = "https://" + url;
    } else if (url.substr(0, 8) === "https://") {
      //do nothing
    } else if (url.substr(0, 7) === "http://") {
      //do nothing
    } else {
      return res.status(400).json({ success: false, message: 'Invalid url' });
    }


    const link = new Link({
      url: url,
      title: req.body.title,
    });

    link.author = req.user._id;
    const savedlink = await link.save();

    const user = await User.findById({ _id: link.author });
    user.links.push(savedlink._id);
    const saveduser = await user.save();
    const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
    res.status(200).json({ success: true, message: "Url saved successfully!!!", data: userdata.links });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// retrieve links
router.get("/", verify, async (req, res) => {
  try {
    const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
    if (userdata.links.length < 1) {
      console.log('no url')
      return res.status(200).json({ success: true, message: 'Please add url', data: userdata.links });
    }
    res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: userdata.links });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update link
router.put("/:linkid", verify, async (req, res) => {
  if (!req.body.url) return res.status(400).json({ success: false, message: 'url required!!!' });
  if (!req.body.title) return res.status(400).json({ success: false, message: 'title required!!!' });
  // if (!req.body.description) return res.status(400).json({ success: false, message: 'description required!!!' });
  try {
    const doc = await Link.find({
      _id: req.params.linkid,
    });
    if (doc[0] == undefined) {
      res.status(404).json({ success: false, message: 'Record not found' });
    } else {
      if (doc[0].author._id.toString() === req.user._id) {
        doc[0].url = req.body.url;
        doc[0].title = req.body.title;

        const data = await doc[0].save();
        res.status(200).json({ success: true, message: 'Url updated successfully', data: data });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// delete link
router.delete("/:linkid", verify, async (req, res) => {
  if (!req.params.linkid) return res.status(400).json({ success: false, message: 'url id required!!!' });
  try {
    const child = await Link.find({
      _id: req.params.linkid,
      author: req.user._id,
    });

    if (child[0] == undefined) {
      res.status(404).json({ success: false, message: 'Record not found' });
    } else {
      if (child[0].author._id.toString() === req.user._id) {
        child[0].remove();
        const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
        res.status(200).json({ success: true, message: "Url deleted successfully!!!", data: userdata.links });
      } else {
        res.status(401).json({ success: false, message: 'Not authorised to delete' });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});
module.exports = router;
