const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
  number: {
    type: String,
  }
});

module.exports = mongoose.model('project', projectSchema);
