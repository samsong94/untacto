/surveyDetail.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

router.post('/',function(req,res,next){
	var companyId = res.locals.userId;
	var surveyId = req.params.id;
	var connection = mysql.createConnection({
		host: 'localhost',
		post: 3306,
		user: 'admin',
		password: 'a103',
		database: 'project1'
	});
	connection.connect();
	var sql = "select emotions from answer where surveyId="+surveyId+"and userId="+companyId+";";
	connection.query(sql, function(err,rows,fields){
			if(!err){
				console.log(rows);
				console.log("answer select success");
				var sql = "select title, kioskId, description_survey, createdAt, expiresAt from survey wher surveyId="+surveyId+"and userId ="+companyId+";";
				connection.query(sql,function(err,rows,fields){
						connection.end();
						if(!err){
							console.log(rows);
							console.log("survey select success");
							res.json({
								title: rows[0]['title'],
								kioskId: rows[0]['kioskId'],
								description_survey: rows[0]["description_survey"],
								createdAt: rows[0]['createdAt'],
								expiresAt: rows[0]['expiresAt']
							});
						}
						else{
							console.log("survey select error");
						}
				});
				
			}
			else{
				console.log("answer select error");
			}
	});
});
module.exports = router;
