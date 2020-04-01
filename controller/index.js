const { Books } = require('../models');

exports.getAllBooks = (req, res) => {
  //response will be array of book objects
  //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

  Books.find({}, (err, arr) => {
    if (err) res.send(err);

    const newArray = arr.map(el => {
      return { el, commentcount: el.comments ? el.comments.length : 0 };
    });
    res.json({ newArray });
  });
};
