const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    require: true
  },
  description: {
    type: String,
  },
  file: {
    type: String,
  },
  term: {
    type: Date,
  },
  status: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  projectId: {
    type: String,
  },
  date: {
    type: Date,
  },
  priority: {
    type: String,
  },
  index: {
    type: Number,
  }
});

module.exports = mongoose.model('task', taskSchema);
