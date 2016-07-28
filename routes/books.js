var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Users() {
  return knex('users');
}

function Books() {
  return knex('books');
}

function Authors() {
  return knex('authors');
}

function BookAuthors() {
  return knex('book_authors');
}

router.get('/', function(req, res, next){
  Books().select().then(function(books){
    knex.from('authors').innerJoin('book_authors', 'authors.id', 'book_authors.author_id').then(function(authors){
      res.render('books/index', {books: books, authors: authors})
    })
  })
})



router.get('/form', function(req, res, next){
  Books().select().then(function(book){
    Authors().select().then(function(authors){
      res.render('books/form', {book: book, authors: authors})
    })
  })
})

router.post('/form', function(req, res, next){
    Books().insert({
      title: req.body.title,
      genre: req.body.genre,
      cover_url: req.body.cover_url,
      description: req.body.description
    }).returning('id').then(function (books) {
      BookAuthors().insert({
        book_id: books[0],
        author_id: req.body.author_id
    }).then(function(authors){
      res.redirect('/books')
    })
    })

})

router.get('/:book_id/edit', function(req, res, next){
  Books().where('id', req.params.book_id).first().then(function(book){
    Authors().select().then(function(authors){
      res.render('books/edit', {book: book, authors: authors})
    })
  })
})

router.post('/:book_id/edit', function(req, res, next){
    Books().where('id', req.params.book_id).update({
      title: req.body.title,
      genre: req.body.genre,
      cover_url: req.body.cover_url,
      description: req.body.description
    }).then(function(books) {
      BookAuthors().where('book_id', req.params.id).update({
        book_id: books[0],
        author_id: req.body.author_id
      }).then(function(bookauthors){
        res.redirect('/books')
      })
    })

})

router.post('/:book_id/delete', function(req, res, next){
  Books().where('id', req.params.book_id).del().then(function(book){
    res.redirect('/books')
  })
})
router.get('/:book_id', function(req, res, next){
  Books().where('id', req.params.book_id).first().then(function(book){
    knex.from('authors').innerJoin('book_authors', 'authors.id', 'book_authors.author_id').then(function(authors){
      res.render('books/show', {book: book, authors: authors})
    })
  })
})

module.exports = router;
