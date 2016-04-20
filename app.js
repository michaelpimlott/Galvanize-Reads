'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var routes = require('./routes/index');
var galvanizeReads = require('./routes/galvanizeReads');
var books = require('./routes/books');
var authors = require('./routes/authors');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport
var app = express();
var knex = require('./db/knex');
require('dotenv').load()

function Users(){
  return knex('users');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

app.use('/', routes);
app.use('/galvanizeReads', galvanizeReads);
app.use('/books', books);
app.use('/authors', authors);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
