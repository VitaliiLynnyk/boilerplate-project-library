const { Books } = require('../models');

exports.getBookById = (req, res) => {
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
};

exports.addCommentToBook = (req, res) => {
  //json res format same as .get
};

exports.deleteBookById = (req, res) => {
  //if successful response will be 'delete successful'
};
