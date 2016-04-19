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
  Authors().select().then(function(authors){
    knex.from('books').innerJoin('book_authors', 'books.id', 'book_authors.book_id').then(function(books){
      res.render('authors/index', {books: books, authors: authors})
    })
  })
})

router.get('/form', function(req, res, next){
  Authors().select().then(function(author){
      res.render('authors/form', {author: author})
    })
});

router.post('/form', function(req, res, next){
    Authors().insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      portrait_url: req.body.portrait_url,
      biography: req.body.biography
    }).then(function (books) {
      res.redirect('/authors')
    })
})

router.get('/:author_id/edit', function(req, res, next){
  Authors().where('id', req.params.author_id).first().then(function(author){
    res.render('authors/edit', {author: author})
  })
})

router.post('/:author_id/edit', function(req, res, next){
    Authors().where('id', req.params.author_id).update(req.body).then(function(authors){
      res.redirect('/authors')
    })
})

router.post('/:author_id/delete', function(req, res, next){
  Authors().where('id', req.params.author_id).del().then(function(authors){
    res.redirect('/authors')
  })
})

  router.get('/:author_id', function(req, res, next){
  Authors().where('id', req.params.author_id).first().then(function(author){
    knex.from('books').innerJoin('book_authors', 'books.id', 'book_authors.book_id').then(function(books){
      res.render('authors/show', {books: books, author: author})
    })
  })
})

module.exports = router;
