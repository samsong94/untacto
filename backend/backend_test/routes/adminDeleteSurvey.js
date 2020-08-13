/adminDeleteSurvey.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url');

router.use(cookieParser());

router.delete('/', function(req, res, next){
	var surveyId = res.locals.surveyId;
	var companyId = res.locals.companyId;

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
	var sql_survey = 'delete from survey where surveyId = '+surveyId+' and userId = ' + companyId + ';';
	connection.query(sql_survey,function(err){
		if(!err){
			console.log("delete survey success");
			res.json({result:"ok"});
		}
		else{
			console.log("delete survey error");
			res.json({error:err});
		}
	});
});

module.exports = router;
