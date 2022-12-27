const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: {
    type: String
  },
  text: {
    type: String
  },
  userName: {
    type: String
  },
  date: {
    type: String
  },
  parentId: {
    type: String
  },
  level: {
    type: Number
  },
  taskId: {
    type: String
  }
});

module.exports = mongoose.model('comment', commentSchema);
