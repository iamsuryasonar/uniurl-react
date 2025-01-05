const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const Link = require("../model/Link");
const { redis } = require('../services/redis');
const { validateUrlWithFix } = require('../utility');

// add link
router.post("/", verify, async (req, res) => {
  try {

    if (!req.body.url) return res.status(400).json({ success: false, message: 'url required' });
    if (!req.body.title) return res.status(400).json({ success: false, message: 'title required' });
    if (req.body.isSocialLink && !req.body.icon) return res.status(400).json({ success: false, message: 'icon required for social links' });

    let url = validateUrlWithFix(req.body.url);
    if (!url) return res.status(400).json({ success: false, message: 'Invalid url' });

    const link = new Link({
      url: url,
      title: req?.body?.title,
      icon: req?.body?.icon,
      color: req?.body?.color,
      order: Number.MAX_SAFE_INTEGER,
      isSocialLink: req?.body?.isSocialLink,
    });

    link.author = req.user._id;
    const savedlink = await link.save();

    // invalidate cache
    redis.del('userlink:' + req.user.username);

    return res.status(200).json({ success: true, message: "Url saved successfully", data: savedlink });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// retrieve links
router.get("/", verify, async (req, res) => {
  try {

    const allLinks = await Link.find({ author: req.user._id }).sort('order');

    const socialLinks = [];
    const links = [];

    allLinks.forEach((link) => {
      if (link.isSocialLink === true) {
        socialLinks.push(link)
      } else {
        links.push(link)
      }
    });

    const data = {
      socialLinks,
      links
    }

    return res.status(200).json({ success: true, message: 'Urls retrieved successfully', data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.put('/reorder', verify, async (req, res) => {
  try {
    const updatedLinks = req.body.urls;

    for (let i = 0; i < updatedLinks.length; i++) {
      await Link.findByIdAndUpdate(updatedLinks[i]._id, { order: i });
    }

    // invalidate cache
    redis.del('userlink:' + req.user.username);

    return res.status(200).json({ success: true, message: 'Order updated successfully', data: null });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// Update link
router.put("/link/:linkid", verify, async (req, res) => {
  try {
    let update = {
    };

    if (req.body.url) {
      update.url = req.body.url;
    }

    if (req.body.title) {
      update.title = req.body.title;
    }

    if (req.body.icon) {
      update.icon = req.body.icon;
    }

    if (req.body.color) {
      update.color = req.body.color;
    }

    if (req.body.isSocialLink !== undefined) {
      update.isSocialLink = req.body.isSocialLink;
    }

    const link = await Link.findOneAndUpdate(
      {
        _id: req.params.linkid,
        author: req.user._id,
      },
      update,
      {
        new: true
      });

    // invalidate cache
    redis.del('userlink:' + req.user.username);

    return res.status(200).json({ success: true, message: 'Url updated successfully', data: link });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// delete link
router.delete("/link/:linkid", verify, async (req, res) => {
  if (!req.params.linkid) return res.status(400).json({ success: false, message: 'url id required' });

  try {
    const links = await Link.find({
      _id: req.params.linkid,
      author: req.user._id,
    });

    if (links[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });

    if (links[0].author._id.toString() === req.user._id.toString()) {
      let deletedLink = links[0].remove();

      // invalidate cache
      redis.del('userlink:' + req.user.username);

      return res.status(200).json({ success: true, message: "Url deleted successfully", data: deletedLink });
    } else {
      return res.status(401).json({ success: false, message: 'Not authorised to delete' });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

module.exports = router;
