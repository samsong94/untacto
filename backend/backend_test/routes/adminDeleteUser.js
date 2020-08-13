/adminDeleteUser.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url');

router.use(cookieParser());

router.delete('/', function(req, res, next){
	var id = res.locals.id;
	
	//connect DB
	var connection = mysql.createConnection({
			host: 'localhost',
			post: 3306,
			user: 'admin',
			password: 'a103',
			database: 'project1'		
	});
	connection.connect();
	
	//sql query
	var sql_survey = 'delete from user where userId=' + id + ';';
	connection.query(sql_survey,function(err){
		if(!err){
			console.log("delete user success");
			res.json({result:"ok"});
		}
		else{
			console.log("delete delete error");
			res.json({error:err});
		}
	});
});

module.exports = router;
