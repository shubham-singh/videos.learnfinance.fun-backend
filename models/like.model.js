const { Schema } = require('mongoose');

const likeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    unique: true
  },
  likes: [{type: Schema.Types.ObjectId, ref: 'video'}]
});

module.exports = { likeSchema }