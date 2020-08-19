/logout.js*/
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser')

router.use(cookieParser());

router.post('/', function (req, res, next) {
	res.clearCookie('user');
	res.clearCookie('userName');
	res.clearCookie('userId');
	res.clearCookie('tok');
	res.redirect('/api/auth/check');
});

module.exports = router;

