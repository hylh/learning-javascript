var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Bunny hop'});
});

/* GET game page. */
router.get('/game', function(req, res) {
  console.log("Got a GET request for /game");
  res.render('game'); 
});

/* GET map page. */
router.get('/map', function(req, res) {
  console.log("Got a GET request for /map");
  res.render('map'); 
});

module.exports = router;
