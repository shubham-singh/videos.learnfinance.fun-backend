const express = require('express');
const router = express.Router();

const { likeVideo, unlikeVideo, dislikeVideo, unDislikeVideo } = require('../controllers/rating.controller.js');

router
.post('/like', likeVideo)
.post('/unlike', unlikeVideo)
.post('/dislike', dislikeVideo)
.post('/undislike', unDislikeVideo)


module.exports = router;