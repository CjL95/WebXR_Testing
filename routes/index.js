var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'WebXR Sandbox',
  	msg: 'Testing ground for WebXR',
  	pageMainClass: 'pgHome'
  });
});

module.exports = router;
