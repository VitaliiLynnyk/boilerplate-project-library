/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test('#example Test GET /api/books', function(done) {
    chai
      .request(server)
      .get('/api/books')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(
          res.body[0],
          'commentcount',
          'Books in array should contain commentcount'
        );
        assert.property(
          res.body[0],
          'title',
          'Books in array should contain title'
        );
        assert.property(
          res.body[0],
          '_id',
          'Books in array should contain _id'
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite('Routing tests', () => {
    suite(
      'POST /api/books with title => create book object/expect book object',
      () => {
        test('Test POST /api/books with title', done => {
          chai
            .request(server)
            .post('/api/books')
            .send({ title: 'Test' })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body.title, 'Test');
              done();
            });
        });

        test('Test POST /api/books with no title given', done => {
          chai
            .request(server)
            .post('/api/books')
            .end((err, res) => {
              assert.equal(res.status, 400);
              assert.equal(res.text, 'no title');
              done();
            });
        });
      }
    );

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books', done => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.exists(res.body[0]._id);
            assert.exists(res.body[0].title);
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db', done => {
        chai
          .request(server)
          .get('/api/books/5e85b98aa8a10014e4f6b6dd')
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', done => {
        chai
          .request(server)
          .get('/api/books/5e85b98aa8a10014e4f6b6a4')
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });
    });

    suite(
      'POST /api/books/[id] => add comment/expect book object with id',
      () => {
        test('Test POST /api/books/[id] with comment', done => {
          chai
            .request(server)
            .post('/api/books/5e85b98aa8a10014e4f6b6a4')
            .send({ comment: 'test test' })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.isArray(res.body.comments);
              done();
            });
        });
      }
    );
  });
});
