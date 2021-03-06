var express = require('express');
var model = require('./model');
var http = require('http');
var querystring = require('querystring');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'SASS'});
});

/* GET map page. */
router.get('/map', function(req, res) {
  console.log("Got a GET request for /map");
  res.render('map'); 
});

/* GET iot page. */
router.get('/iot', function(req, res, next) {
  console.log("Got a GET request for /iot");
  const array = { x: 2, y: 2};

  res.render('iot', {foo: array});
});

router.get("/stats", function(req, res, next) {
  console.log("Got a GET request for /stats");
  res.render('stats');
});

const options = {
  host: 'localhost',
  //host: 'tundra-iot.herokuapp.com',
  path: '/model',
  //port: '80',
  port: '3000',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

callback = function(response) {
  let body = '';
  response.on('data', function(chunk){
    body += chunk;
  });
}

function create_post_string(temperature, humidity, pressure){
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return "month=" + month + "&day=" + day + "&temperature=" + temperature + "&humidity=" + humidity + "&pressure=" + pressure;
}

/* POST measurements. */
router.post('/measure', function(req, res){
  console.log("Got a POST request for /measure");
  let message = req.body.string_value;
  /* string_value is the message */
  console.log("message: ", message);

  if (message.indexOf("{") != -1) {
    let length = message.length;
    message = message.slice(1, length - 1);
    console.log(message);
  }
  let message_array = message.split(",");
  let temperature = message_array[0];
  let humidity = message_array[1];
  let pressure = message_array[2]; 
  let post_string = create_post_string(temperature, humidity, pressure);
  console.log("Post string: ", post_string);
  let post_request = http.request(options, callback);
  post_request.write(post_string);
  post_request.end();
  post_request.on('error', function(e){
    console.error(e);
  })
  res.send("200 OK");
});

/* DATABASE FUNCTIONS */

/* Measurements functions */
router.get('/model', model.findAll);
router.get('/model/day/:id', model.findById);
router.get('/model/month', model.listMonths);
router.get('/model/month/:id', model.findMonthById);
router.post('/model', model.addItem);
/* Location functions */
router.get('/model/location', model.getLocation);
router.post('/model/location', model.addLocation);

module.exports = router;
