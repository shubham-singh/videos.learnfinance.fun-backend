const express = require('express');
const router = express.Router();

const { createPlaylist, addToPlaylist, getAllPlaylists,getPlaylist } = require('../controllers/playlist.controller.js');

router.param('playlistId', async (req, res, next ,id) => {
  try {
    req.playlistID = id;
    next()
  } catch (error) {
    res.status(400).json({success: false, message: "could not retrieve video"})
  }
})
router
.get('/', getAllPlaylists)
.get('/:playlistId', getPlaylist)
.post('/create', createPlaylist)
.post('/add', addToPlaylist)

module.exports = router;