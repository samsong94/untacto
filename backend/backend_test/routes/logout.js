/logout.js*/
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')

router.use(cookieParser());

router.post('/', function (req, res, next) {
	//console.log('logout: ' + req.cookies.user + '.');
	res.clearCookie('user');
	res.clearCookie('userName');
	res.clearCookie('userId');
	res.clearCookie('tok');
	res.redirect('/');
});

module.exports = router;

