const express = require('express');
const router = express.Router();

const { getHistory, addToHistory, clearHistory } = require('../controllers/history.controller.js');

router
.get('/', getHistory)
.post('/', addToHistory)
.delete('/clear', clearHistory)

module.exports = router;