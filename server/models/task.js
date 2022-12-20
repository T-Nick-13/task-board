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
  },
  subtasks: [{
    title: {
      type: String
    },
    complete: {
      type: Boolean
    },
    id: {
      type: String
    },
  }]
});

module.exports = mongoose.model('task', taskSchema);
