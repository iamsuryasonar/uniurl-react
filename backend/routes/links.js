const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const User = require("../model/User");
const { linkValidation } = require("../middleware/authValidation");
const Link = require("../model/Link");
const mongoose = require("mongoose");
const { redis } = require('../services/redis');

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

    var session = await mongoose.startSession();
    session.startTransaction();

    const link = new Link({
      url: req?.body?.url,
      title: req?.body?.title,
      icon: req?.body?.icon,
      color: req?.body?.color,
    });

    link.author = req.user._id;
    const savedlink = await link.save({ session });

    const user = await User.findById({ _id: link.author });
    user.links.push(savedlink._id);

    const saveduser = await user.save({ session });

    await session.commitTransaction();

    // invalidate cache
    redis.del('userlink:' + req.user.username);

    const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
    return res.status(200).json({ success: true, message: "Url saved successfully!!!", data: userdata.links });
  } catch (err) {
    console.log(err)
    await session.abortTransaction();
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  } finally {
    session.endSession();
  }
});

// retrieve links
router.get("/", verify, async (req, res) => {
  try {
    const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
    return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: userdata.links });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update link
router.put("/:linkid", verify, async (req, res) => {
  if (!req.body.url) return res.status(400).json({ success: false, message: 'url required!!!' });
  if (!req.body.title) return res.status(400).json({ success: false, message: 'title required!!!' });
  try {
    const doc = await Link.find({
      _id: req.params.linkid,
    });

    if (doc[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });


    if (doc[0].author._id.toString() === req.user._id) {
      doc[0].url = req.body.url;
      doc[0].title = req.body.title;

      const data = await doc[0].save();

      // invalidate cache
      redis.del('userlink:' + req.user.username);

      return res.status(200).json({ success: true, message: 'Url updated successfully', data: data });
    } else {
      return res.status(401).json({ success: false, message: 'Not authorised to update' });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
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

    if (child[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });

    if (child[0].author._id.toString() === req.user._id) {
      child[0].remove();

      // invalidate cache
      redis.del('userlink:' + req.user.username);

      const userdata = await User.findById({ _id: req.user._id }).select('-password').populate("links");
      return res.status(200).json({ success: true, message: "Url deleted successfully!!!", data: userdata.links });
    } else {
      return res.status(401).json({ success: false, message: 'Not authorised to delete' });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});
module.exports = router;
