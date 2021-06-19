const { Playlist } = require('../db/db.connect.js')

const createPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      user_id: req.user.userID
    });
    const { playlist_name, videoID } = req.body;
    if (playlist === null) {
      const newPlaylist = new Playlist({
        user_id: req.user.userID,
        playlists: [{ playlist_name, videos: [videoID] }]
      })
      await newPlaylist.save();
      return res.status(200).json({
        success: true,
        playlist: newPlaylist
      })
    }
    playlist.playlists.push({ playlist_name, videos: [videoID] })
    await playlist.save();
    res.status(200).json({
      success: true,
      playlist
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({
      success: false,
      error: error.message
    })
  }
}

const addToPlaylist = async (req, res) => {
  try {
    const { playlist_name, videoID } = req.body;
    const filter = {
      user_id: req.user.userID,
      'playlists.playlist_name': playlist_name
    }
    const update = {
      $push: { 'playlists.$.videos': videoID }
    }
    const playlist = await Playlist.findOneAndUpdate(filter, update, { new: true });
    res.status(200).json({
      success: true,
      playlist
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { createPlaylist, addToPlaylist }