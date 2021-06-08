const express = require('express');
const router = express.Router();

const Video = require('../models/video.model');
const { getAllVideos, addVideo, getVideo } = require('../controllers/video.controller.js');

router.param('videoId', async (req, res, next ,id) => {
  try {
    req.videoID = id;
    next()
  } catch (error) {
    res.status(400).json({success: false, message: "could not retrieve video"})
  }
})

router
.get('/', getAllVideos)
.post('/', addVideo)
.get('/:videoId', getVideo)



module.exports = router;