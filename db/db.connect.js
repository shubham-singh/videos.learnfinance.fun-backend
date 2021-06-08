const mongoose = require('mongoose');

const dbURI = process.env['dbURI'];

const { videoSchema } = require('../models/video.model.js');
const { playlistSchema } = require('../models/playlist.model.js');
const { ratingSchema } = require('../models/rating.model.js');
const { historySchema } = require('../models/history.model.js'); 


const dbConnect = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const Video = dbConnect.model('video', videoSchema);
const Playlist = dbConnect.model('playlist', playlistSchema);
const Rating = dbConnect.model('rating', ratingSchema);
const History = dbConnect.model('history', historySchema);

module.exports = { dbConnect, Video, Playlist, Rating, History };