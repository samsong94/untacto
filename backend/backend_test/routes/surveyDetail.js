/surveyDetail.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');

router.get('/',function(req,res,next){
	var companyId = res.locals.userId;
	var surveyId = res.locals.id;
	console.log(surveyId);
	var connection = mysql.createConnection({
		host: 'localhost',
		post: 3306,
		user: 'admin',
		password: 'a103',
		database: 'project1'
	});
	connection.connect();
	var sql1 = "select emotions from answer where surveyId="+surveyId+" and userId="+companyId+";";
	var sql2 = "select title, kioskId, description_survey, createdAt, expiresAt from survey where surveyId = "+surveyId+" and userId = "+companyId+";";
	var sql3 = "select userName from user where userId = "+companyId+";";
	var sql4 = "select location from kiosk where kioskId = ";
	//answer sql
	var send_message="error";
	connection.query(sql1,function(err,rows,fields){
			if(!err){
				console.log("answer select success");
				send_message="answer:"+rows[0]['emotions']+",";
			}
			else{
				console.log("answer select error");
				console.log(err);
			}
	});
	//survey sql
	connection.query(sql2,function(err,rows,fields){
			if(!err){
				console.log("survey select success");
				var title = rows[0]['title'];
				var kioskId = rows[0]['kioskId'];
				var description_survey = rows[0]['description_survey'];
				var createdAt = rows[0]['createdAt'];
				var expiresAt = rows[0]['expiresAt'];
				sql4+=kioskId+";";
				//kiosk sql
				connection.query(sql4,function(err2,rows2,fields2){
					if(!err2){
						console.log("kiosk select success");
						var location_kiosk = rows2[0]['location'];
						send_message+="kiosk:{kioskId: "+kioskId+",location: "+location_kiosk+"}";
						console.log(send_message);
						res.json(send_message);
					}
					else{
						console.log("kiosk select error");
						console.log(err2);
					}
				});
				send_message+="title:"+title+",createdAt:"+createdAt+",expiresAt:"+expiresAt+",description:"+description_survey+",";
			}
			else{
				console.log("survey select error");
				console.log(err);
			}
	});
	//user sql
	connection.query(sql3,function(err,rows,fields){
			connection.end();
			if(!err){
				var companyName = rows[0]['userName'];
				send_message+="user:{companyName:"+companyName+",userId:"+companyId+"},";
			}
			else{
				console.log("user select error");
				console.log(err);
			}
	});
});
module.exports = router;
