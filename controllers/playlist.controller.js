const { Playlist } = require('../db/db.connect.js')

const getAllPlaylists = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      user_id: req.user.userID
    }).populate('playlists.videos');
    
    if (playlist === null) {
      return res.status(200).json({
        success: true,
        playlist: {
          playlists: []
        }
      })
    }

    res.status(200).json({
      success: true,
      playlist
    })

  } catch (error) {
    
    res.status(400).json({
      success: false,
      message: error.message
    })

  }
}

const getPlaylist = async (req, res) => {
  try {
    const { playlistID } = req;
    const playlists = await Playlist.findOne({user_id: req.user.userID}).populate("playlists.videos");

    const playlist = playlists.playlists.id(playlistID);

    if(!playlist) {
      return res.status(404).json({success: false, message: "playlist not found"})
    } 

    res.status(200).json({
      success: true,
      playlist
    })

  } catch (error) {

    res.status(400).json({
      success: false,
      message: "playlist not found"
    })

  }
}

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
    const playlist = await Playlist.findOneAndUpdate(filter, update, { new: true }).populate("playlists.videos");
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

const deletePlaylist = async (req, res) => {
  try {
    const { playlistID } = req;
    const playlist = await Playlist.findOne({
      user_id: req.user.userID
    });
    playlist.playlists.pull({_id: playlistID});
    await playlist.save();
    res.status(200).json({
      success: true,
      playlistID
    })
  } catch (error) {
    res.status(200).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { getPlaylist, getAllPlaylists ,createPlaylist, addToPlaylist, deletePlaylist }