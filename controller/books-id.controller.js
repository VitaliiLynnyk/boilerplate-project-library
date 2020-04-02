const { Books } = require('../models');

exports.getBookById = (req, res) => {
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  const { id } = req.params;

  Books.find({ _id: id }, (err, books) => {
    if (err) res.send(err);

    const newBooks = books.map(book => {
      return {
        ...book._doc,
        commentcount: book.comments ? book.comments.length : 0
      };
    });

    res.json(newBooks);
  });
};

exports.addCommentToBook = (req, res) => {
  //json res format same as .get
};

exports.deleteBookById = (req, res) => {
  //if successful response will be 'delete successful'
};
