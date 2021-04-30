const express = require('express');
const router = express.Router();
const Video = require('../models/video.model');

router.param('videoId', async (req, res, next ,id) => {
  try {
    const video = await Video.findById(id);
    if(!video) {
      return res.status(404).json({success: false, message: "video not found"})
    } 
    req.video = video;
    next()
  } catch (error) {
    res.status(400).json({success: false, message: "could not retrieve video"})
  }
})

router.route('/:videoId')
.get((req, res) => {
  let { video } = req;
  video.__v = undefined;
  res.json({success: true, video })
})

module.exports = router;