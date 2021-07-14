const express = require('express');
const router = express.Router();

const { getRatings, likeVideo, unlikeVideo, dislikeVideo, unDislikeVideo } = require('../controllers/rating.controller.js');

router
.get('/all', getRatings)
.post('/like', likeVideo)
.post('/unlike', unlikeVideo)
.post('/dislike', dislikeVideo)
.post('/undislike', unDislikeVideo)

module.exports = router;