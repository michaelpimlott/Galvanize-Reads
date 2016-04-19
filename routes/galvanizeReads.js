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

router.get('/', function(req, res, next) {
  Users().select().then(function(users){
    if(req.session){
      var profile = res.locals.user
      res.render('index', {users:users, profile: profile});
    } else {
      res.render('index', {users:users, profile: profile});
    }
  })
})

module.exports = router;
