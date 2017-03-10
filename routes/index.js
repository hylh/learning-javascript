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

router.get('/iot', function(req, res, next) {
  console.log("Got a GET request for /iot");
  const array = { x: 2, y: 2};

  res.render('iot', {foo: array});
});

/* POST measurements. */
router.post('/measure', function(req, res){
  console.log("Got a POST request for /measure");
  var message = req.body.string_value;
  /* string_value is the message */
  console.log("message: ", message)
});

module.exports = router;
