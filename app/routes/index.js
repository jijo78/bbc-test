var express = require('express');
var route = express.Router();
/* GET home page. */
route.get('/', function(req, res, next) {
	res.render('index', { title: 'Welcome to your text app'});
});

module.exports = route;
