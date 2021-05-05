const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const VideoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Video title is required']
  },
  youtubeId: {
    type: String,
    required: [true, 'Youtube ID is required']
  },
  statistics: {
    viewCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number, 
      default: 0
    },
    dislikeCount: {
      type: Number,
      default: 0
    }
  }
})

const Video = mongoose.model('video', VideoSchema);

module.exports = Video;