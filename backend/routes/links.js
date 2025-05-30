const router = require("express").Router();
const { verify } = require("../middleware/verifyToken");
const Link = require("../model/Link");
const { redis, isRedisActive } = require('../services/redis');
const { validateUrlWithFix } = require('../utility');
const sharp = require('sharp');
const { upload, uploadTos3, deleteS3Object } = require('./../middleware/multerConfig');
const { URL_TYPE } = require("../constants/constant");

// add link
router.post("/", verify, upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
  try {

    if (!req.body.url) return res.status(400).json({ success: false, message: 'url required' });
    if (!req.body.title) return res.status(400).json({ success: false, message: 'title required' });
    if (req.body?.type === URL_TYPE.SOCIAL_LINK && !req.body.icon) return res.status(400).json({ success: false, message: 'icon required for social links' });
    if (req.body?.type === URL_TYPE.AFFILIATE_LINK && !req?.files['image'][0]) return res.status(400).json({ success: false, message: 'image required for affiliate links' });

    let url = validateUrlWithFix(req.body.url);
    if (!url) return res.status(400).json({ success: false, message: 'Invalid url' });

    let picture;

    console.log(req?.files['image'])

    if ((req.body?.type === URL_TYPE.AFFILIATE_LINK) && req?.files['image'][0]) {
      let image = req?.files['image'][0];

      let webpImageBuffer = await sharp(image.buffer) // convert to webp with quality 20%
        .webp([{ near_lossless: true }, { quality: 20 }])
        .toBuffer();

      let uploadedImageInfo;

      await uploadTos3(webpImageBuffer).then((result) => {
        uploadedImageInfo = result;
      });

      picture = {
        url: uploadedImageInfo.url,
        fileName: uploadedImageInfo.fileName,
      }
    }

    const link = new Link({
      url: url,
      title: req?.body?.title,
      icon: req?.body?.icon,
      color: req?.body?.color,
      order: Number.MAX_SAFE_INTEGER,
      type: req?.body?.type,
    });

    if (picture) link.image = picture;

    link.author = req.user._id;
    const savedlink = await link.save();

    // invalidate cache
    if (isRedisActive) {
      redis.del('userlink:' + req.user.username);
    }

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
    const affiliateLinks = [];
    const iconLinks = [];

    allLinks.forEach((link) => {
      if (link.type === URL_TYPE.SOCIAL_LINK) {
        socialLinks.push(link);
      } else if (link.type === URL_TYPE.AFFILIATE_LINK) {
        affiliateLinks.push(link);
      } else {
        iconLinks.push(link);
      }
    });

    const data = {
      socialLinks,
      affiliateLinks,
      iconLinks
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
    if (isRedisActive) {
      redis.del('userlink:' + req.user.username);
    }

    return res.status(200).json({ success: true, message: 'Order updated successfully', data: null });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ success: false, message: 'Internal server error ' });
  }
});

// Update link
router.put("/link/:linkid", verify, upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
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

    if (req.body.type) {
      update.type = req.body.type;
    }

    let picture;

    if ((req.body?.type === URL_TYPE.AFFILIATE_LINK) && req?.files['image'] && req?.files['image'][0]) {

      let image = req?.files['image'][0];

      const [webpImageBuffer, links] = await Promise.all([
        sharp(image.buffer) // convert to webp with quality 20%
          .webp([{ near_lossless: true }, { quality: 20 }])
          .toBuffer(),
        Link.find({
          _id: req.params.linkid,
          author: req.user._id,
        })
      ])

      let uploadedImageInfo;

      await uploadTos3(webpImageBuffer).then((result) => {
        uploadedImageInfo = result;
      });

      if (links[0]?.image && links[0]?.image?.fileName) {
        await deleteS3Object(links[0]?.image?.fileName);
      }

      picture = {
        url: uploadedImageInfo.url,
        fileName: uploadedImageInfo.fileName,
      }
    }

    if (picture) update.image = picture;

    const updatedLink = await Link.findOneAndUpdate(
      {
        _id: req.params.linkid,
        author: req.user._id,
      },
      update,
      {
        new: true
      });

    // invalidate cache
    if (isRedisActive) {
      redis.del('userlink:' + req.user.username);
    }

    return res.status(200).json({ success: true, message: 'Url updated successfully', data: updatedLink });
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

    if (links[0]?.image && links[0]?.image?.fileName) {
      await deleteS3Object(links[0]?.image?.fileName);
    }

    if (links[0].author._id.toString() === req.user._id.toString()) {
      let deletedLink = links[0].remove();

      // invalidate cache
      if (isRedisActive) {
        redis.del('userlink:' + req.user.username);
      }

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
