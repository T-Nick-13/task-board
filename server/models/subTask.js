const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    require: true
  },
  complete: {
    type: Boolean
  },
  id: {
    type: String
  },
  taskId: {
    type: String
  }
});

module.exports = mongoose.model('subtask', subTaskSchema);
