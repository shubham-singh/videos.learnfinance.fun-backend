const mongoose = require('mongoose');

const dbURI = process.env['dbURI'];

const { videoSchema } = require('../models/video.model.js');
const { playlistSchema } = require('../models/playlist.model.js');
const { likeSchema } = require('../models/like.model.js');
const { historySchema } = require('../models/history.model.js'); 


const dbConnect = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})

const Video = dbConnect.model('video', videoSchema);
const Playlist = dbConnect.model('playlist', playlistSchema);
const Like = dbConnect.model('like', likeSchema);
const History = dbConnect.model('history', historySchema);

module.exports = { dbConnect, Video, Playlist, Like, History };