const express = require('express');
const router = express.Router();

const { likeVideo, unlikeVideo } = require('../controllers/rating.controller.js');

router
.post('/', likeVideo)
// .post('/', unlikeVideo);

module.exports = router;