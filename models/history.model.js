const { Schema } = require('mongoose');

const historySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  history: [{type: Schema.Types.ObjectId, ref: 'video'}]
});

module.exports = { historySchema }