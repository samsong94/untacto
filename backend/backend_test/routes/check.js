/check.js*/
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var { verifyToken } = require('./tokenAuth');

var mysql = require('mysql');

router.use(cookieParser());

router.get('/', verifyToken, function (req, res, err) {
	var companyName = req.cookies.userName;
	var companyId = req.cookies.userId;
	var user = {
		userName: companyName,
		userId: companyId
	};
	if(user == null){
		res.send('');
	} else {
		res.json(user);
	}
});

module.exports = router;

