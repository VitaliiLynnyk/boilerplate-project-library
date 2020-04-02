const { Books } = require('../models');

exports.getBookById = (req, res) => {
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  const { id } = req.params;

  Books.find({ _id: id }, (err, books) => {
    if (err) res.send(err);
    res.json(books);
  });
};

exports.addCommentToBook = (req, res) => {
  //json res format same as .get
  const { id } = req.params;
  const { comment } = req.body;

  Books.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { comments: comment } },
    { new: true, useFindAndModify: false },
    (err, book) => {
      if (err) res.send(err);
      res.json(book);
    }
  );
};

exports.deleteBookById = (req, res) => {
  //if successful response will be 'delete successful'
};
