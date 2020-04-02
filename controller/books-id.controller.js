const { Books } = require('../models');

exports.getBookById = (req, res) => {
  //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
  const { id } = req.params;

  Books.findById({ _id: id }, (err, books) => {
    if (!books) return res.status(400).send('no book exists');

    return res.status(200).json(books);
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
      if (err) return res.status(500).send(err);
      return res.status(200).json(book);
    }
  );
};

exports.deleteBookById = (req, res) => {
  //if successful response will be 'delete successful'
  const { id } = req.params;

  Books.findByIdAndRemove({ _id: id }, { useFindAndModify: false }, err => {
    if (err) return res.status(500).send(err);

    return res.status(200).send('delete successful');
  });
};
