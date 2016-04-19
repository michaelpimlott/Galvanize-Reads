var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.redirect('/galvanizeReads');
  //res.render('index', { title: 'Galvanize Reads' });
});

module.exports = router;
