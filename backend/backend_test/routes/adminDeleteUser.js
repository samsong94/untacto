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
	var sql_user = 'delete from user where userId=' + id + ';';
	var sql_survey = 'delete from survey where userId=' + id + ';';
	connection.query(sql_user, function(err){
		if(!err){
			console.log("delete user success");
			connection.query(sql_survey, function(err2){
				if(!err2){
					console.log("delete surveys success");
					res.json({result:"ok"});
				}
				else{
					console.log("delete surveys error");
					res.json({error:err2});
				}
			});
		}
		else{
			console.log("delete delete error");
			res.json({error:err});
		}
	});
});

module.exports = router;
