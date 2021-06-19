const { Rating, Video } = require('../db/db.connect.js')

const unlikeVideo = async (req, res) => {
  try {

    const rating = await Rating.findOne({
      user_id: req.user.userID
    })

    const { videoID } = req.body;

    const filter = { _id: videoID }

    const update = { $inc: { 'statistics.likeCount': -1 } }

    rating.likes.pull(videoID);

    await rating.save();

    const video = await Video.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json({
      success: true,
      rating,
      video
    })

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    })

  }
}


const likeVideo = async (req, res) => {
  try {

    const rating = await Rating.findOne({ user_id: req.user.userID });

    const { videoID } = req.body;

    const filter = { _id: videoID }

    const update = { $inc: { 'statistics.likeCount': 1 } }

    if (rating === null) {

      const newRating = new Rating({
        user_id: req.user.userID,
        likes: [videoID],
        dislikes: []
      })

      await newRating.save();

      const video = await Video.findOneAndUpdate(filter, update, { new: true });

      return res.status(200).json({
        success: true,
        rating: newRating,
        video
      })

    }

    if (rating.dislikes.includes(videoID)) {
      rating.dislikes.pull(videoID);
      await Video.findOneAndUpdate(filter, { $inc: { 'statistics.dislikeCount': -1 } })
    }

    rating.likes.push(videoID);

    await rating.save();

    const video = await Video.findOneAndUpdate(filter, update, { new: true });

    res.status(200).json({
      success: true,
      rating,
      video
    })

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message
    })

  }
}

const dislikeVideo = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      user_id: req.user.userID
    });
    const { videoID } = req.body;
    const filter = { _id: videoID };
    const update = { $inc: { 'statistics.dislikeCount': 1 } };
    if (rating === null) {
      const newRating = new Rating({
        user_id: req.user.userID,
        likes: [],
        dislikes: [videoID]
      });
      await newRating.save();
      const video = await Video.findOneAndUpdate(filter, update);
      return res.status(200).json({
        success: true,
        rating: newRating,
        video
      })
    }
    if (rating.likes.includes(videoID)) {
      rating.likes.pull(videoID);
      await Video.findOneAndUpdate(filter, { $inc: {'statistics.likeCount': -1} })
    }
    rating.dislikes.push(videoID);
    await rating.save();
    const video = await Video.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({
      success: true,
      rating,
      video
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const unDislikeVideo = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      user_id: req.user.userID
    });
    const { videoID } = req.body;
    const filter = { _id: videoID };
    const update = { $inc: { 'statistics.dislikeCount': -1 } }
    rating.dislikes.pull(videoID);
    await rating.save();
    const video = await Video.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({
      success: true,
      rating,
      video
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}


module.exports = { likeVideo, unlikeVideo, dislikeVideo, unDislikeVideo }