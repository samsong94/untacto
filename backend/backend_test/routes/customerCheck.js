/customerCheck.js*/
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var { verifyTokenCustomer } = require('./tokenAuth');

var mysql = require('mysql');

router.use(cookieParser());

router.get('/', verifyTokenCustomer, function (req, res, err) {
	var customer = req.cookies.customer;
	var customerId = req.cookies.customerId;
	var age = req.cookies.age;
	if(customer == null){
		res.send('');
	} else {
	res.json({
			'customer': customer,
			'age': age,
			'customerId': customerId,
		});
	}
});

module.exports = router;

