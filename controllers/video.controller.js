const { Video } = require('../db/db.connect.js')

const getAllVideos = async (req, res) => {
  try {

    const videos = await Video.find({});
    res.status(200).json({
      success: true, 
      videos
    })
  
  } catch (error) {
    res.status(400).json({
      success: false, 
      error: error.message
    });

  }
};

const addVideo = async (req, res) => {
  try {

    const video = req.body;
    const NewVideo = new Video(video);
    const savedVideo = await NewVideo.save();

    res.status(200).json({
      success: true, 
      video: savedVideo
    })
  
  } catch(err) {

    res.status(500).json({
      success: false,
      message: 'Unable to add product',
      error: err.message  
    })
  }
}

const getVideo = async (req, res) => {
  try {

    const { videoID } = req;
    const video = await Video.findById(videoID);

    if(!video) {
      return res.status(404).json({success: false, message: "video not found"})
    } 

    video.__v = undefined;

    res.status(200).json({
      success: true,
      video
    })

  } catch (error) {
    res.status(400).json({
      success: false, 
      message: "could not retrieve video"
    });

  }
}

const incrementViewCount = async (req, res) => {
  try {
    const { videoID } = req;
    const filter = { _id: videoID };
    const update = { $inc: { 'statistics.viewCount': 1 } }
    await Video.findOneAndUpdate(filter, update);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { getAllVideos, addVideo, getVideo, incrementViewCount }