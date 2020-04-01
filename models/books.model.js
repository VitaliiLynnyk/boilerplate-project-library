const mongoose = require('mongoose');

const booksModel = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  comments: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Books', booksModel);
