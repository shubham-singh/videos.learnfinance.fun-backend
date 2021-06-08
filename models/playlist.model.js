const { Schema } = require('mongoose');

const playlist = new Schema({
  playlist_name: {
    type: String,
    required: [true, 'Playlist name is required']
  },
  videos: [{type: Schema.Types.ObjectId, ref: 'video'}]
})

const playlistSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  playlists: [playlist]

});

module.exports = { playlistSchema }