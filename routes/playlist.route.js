const express = require('express');
const router = express.Router();

const { createPlaylist, addToPlaylist } = require('../controllers/playlist.controller.js');

router
.post('/create', createPlaylist)
.post('/add', addToPlaylist)

module.exports = router;