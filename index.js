const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./db/db.connect');

dbConnect();

const app = express();

const Video = require('./models/video.model');

app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);
    res.json({success: true, videos})
  } catch (error) {
    res.json({success: false, errorMessage: error.message});
  }
})

app.post('/', async (req, res) => {
  try {
    const video = req.body;
    const NewVideo = new Video(video);
    const savedVideo = await NewVideo.save();
    res.json({success: true, video: savedVideo})
  } catch(err) {
    res.status(500).json({
      success: false,
      message: 'Unable to add product',
      errorMessage: err.message  
    })
  }
})

app.listen(process.env.PORT || 3000, '0.0.0.0');