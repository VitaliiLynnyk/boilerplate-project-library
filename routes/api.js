/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 4,
  wtimeout: 2500
});

db.on('err', console.error.bind(console, 'connection error'));
db.once('openURI', () => console.log('connected'));

const { BooksController, BooksIdController } = require('../controller');

module.exports = function(app) {
  app
    .route('/api/books')
    .get(BooksController.getAllBooks)
    .post(BooksController.postBook)
    .delete(BooksController.deleteBooks);

  app
    .route('/api/books/:id')
    .get(BooksIdController.getBookById)
    .post(BooksIdController.addCommentToBook)
    .delete(BooksIdController.deleteBookById);
};
