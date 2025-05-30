const router = require("express").Router();
const mongoose = require('mongoose')
const sharp = require('sharp');
const { verify } = require("../middleware/verifyToken");
const { upload, uploadTos3, deleteS3Object } = require('./../middleware/multerConfig');
const { redis, isRedisActive } = require('../services/redis');
const Gallery = require("../model/Gallery");

router.get("/", verify, async (req, res) => {
    try {
        let gallery = await Gallery.find({ author: req.user._id }).sort('order');

        return res.status(200).json({ success: true, message: '', data: gallery });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error ' });
    }
});

router.post('/', verify, upload.fields([{ name: 'file', maxCount: 1 }]), async (req, res) => {
    try {
        const image = req?.files['file'][0];

        if (!req?.body?.description) return res.status(400).json({ success: false, message: 'description of image required' });
        if (!req?.files['file'][0]) return res.status(400).json({ success: false, message: '' });

        const webpImageBuffer = await sharp(image.buffer) // convert to webp with quality 20%
            .webp([{ near_lossless: true }, { quality: 20 }])
            .toBuffer();

        let uploadedImageInfo;

        await uploadTos3(webpImageBuffer).then((result) => {
            uploadedImageInfo = result;
        })

        const gallery = new Gallery({
            description: req.body.description,
            picture: {
                url: uploadedImageInfo.url,
                fileName: uploadedImageInfo.fileName,
            },
            order: Number.MAX_SAFE_INTEGER,
            author: req.user._id
        });

        const savedGallery = await gallery.save();

        // invalidate cache
        if (isRedisActive) {
            redis.del('userlink:' + req.user.username);
        }

        return res.status(200).json({ success: true, message: '', data: savedGallery });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
})

router.delete('/:galleryId', verify, async (req, res) => {
    let session = await mongoose.startSession();
    try {
        session.startTransaction();

        const gallery = await Gallery.find({
            _id: req.params.galleryId,
            author: req.user._id,
        });

        if (gallery[0] == undefined) return res.status(404).json({ success: false, message: 'Record not found' });

        if (gallery[0]?.picture && gallery[0]?.picture?.fileName) {
            await deleteS3Object(gallery[0]?.picture?.fileName);
        }

        if (gallery[0].author._id.toString() === req.user._id.toString()) {
            await gallery[0].deleteOne({ session });

            // invalidate cache
            if (isRedisActive) {
                redis.del('userlink:' + req.user.username);
            }

            await session.commitTransaction();
            session.endSession();

            return res.status(200).json({ success: true, message: "Gallery image deleted successfully", data: null });
        } else {
            return res.status(401).json({ success: false, message: 'Not authorised to delete' });
        }
    } catch (err) {
        session.endSession();
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
})

module.exports = router;
