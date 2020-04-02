const { Books } = require('../models');

exports.getAllBooks = (req, res) => {
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

  Books.find((err, books) => {
    if (err) return res.status(500).send(err);

    const newBooks = books.map(book => {
      return {
        ...book._doc,
        commentcount: book.comments ? book.comments.length : 0
      };
    });

    return res.status(200).json(newBooks);
  });
};

exports.postBook = (req, res) => {
  //response will contain new book object including atleast _id and title
  const { title } = req.body;

  if (!title) return res.status(400).send('no title');

  const newBook = new Books({ title });
  newBook.save((err, obj) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(obj);
  });
};

exports.deleteBooks = (req, res) => {
  //if successful response will be 'complete delete successful'
  Books.deleteMany(err => {
    if (err) return res.status(500).send(err);

    return res.status(200).send('complete delete successful');
  });
};
