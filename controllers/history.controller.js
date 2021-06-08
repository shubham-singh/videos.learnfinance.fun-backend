const { History } = require('../db/db.connect.js')

const getHistory = async (req, res) => {
  try {
    const history = await History.findOne({
      user_id: req.user.userID
    })

    if (history === null) {
      return res.status(200).json({
        success: true,
        history: []
      })
    }

    res.status(200).json({
      success: true,
      history
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const addToHistory = async (req, res) => {
  try {
    const history = await History.findOne({
      user_id: req.user.userID
    });
    const { videoID } = req.body;

    if (history === null) {
      const newHistory = new History({
        user_id: req.user.userID,
        history: [videoID]
      });
      await newHistory.save();
      return res.status(200).json({
        success: true,
        history: newHistory
      })
    }

    if (history.history.includes(videoID)) {
      return res.status(200).json({
        success: true,
        history
      })
    }
    
    history.history.push(videoID);
    await history.save();
    res.status(200).json({
      success: true,
      history
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
};

const clearHistory = async (req, res) => {
  try {
    const filter = { user_id: req.user.userID };
    const update = { $set: { 'history': [] } }
    const history = await History.findOneAndUpdate(filter, update, { new: true });
    if (history === null) {
      return res.status(200).json({
        user_id: req.user.userID,
        history: []
      })
    }
    res.status(200).json({
      success: true,
      history
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

module.exports = { getHistory, addToHistory, clearHistory }