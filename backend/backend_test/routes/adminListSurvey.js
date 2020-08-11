/showSurveyList.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url');

router.use(cookieParser());

router.get('/', function(req, res, next){
		var page = res.locals.query.page;
		var userId = res.locals.query.companyId;
		var kioskId = res.locals.query.kioskId;
		var connection = mysql.createConnection({
			host:'localhost',
			post: 3306,
			user: 'admin',
			password: 'a103',
			database: 'project1'
		});
		connection.connect();
		var sql = "select * from survey";
		var survey_list = new Array();
		var page_count = page*10;
		var next_count = (page+1)*10;
		if(userId!=undefined&&kioskId!=undefined){
			sql+=" where userId = "+userId+" and kioskId = "+kioskId+";";
			connection.query(sql,function(err,rows,fields){
				if(!err){
					console.log("success both");
					var i =0;
					while(rows[i]!=undefined){
						if(i>=page_count&&i<next_count){
							var surveyId = rows[i]['surveyId'];
							var userId = rows[i]['userId'];
							var kioskId = rows[i]['kioskId'];
							var title = rows[i]['title'];
							var createdAt = rows[i]['createdAt'];
							var expiresAt = rows[i]['expiresAt'];
							var beginsAt = rows[i]['beginsAt'];
							var survey = {
								surveyId:surveyId,
								userId: userId,
								kioskId: kioskId,
								title: title,
								createdAt: createdAt,
								expiresAt: expiresAt,
								beginsAt: beginsAt
							};
							survey_list.push(survey);
						}
						i++;
					}
					res.json(survey_list);
				}
				else{
					console.log(err);
				}
			});
		}
		else if(userId!=undefined){
			sql+=" where userId = "+userId+";";
			connection.query(sql,function(err,rows,fields){
				if(!err){
					console.log("success userId");
					var i =0;
					while(rows[i]!=undefined){
						if(i<=page_count&&i<next_count){
							var surveyId = rows[i]['surveyId'];
							var userId = rows[i]['userId'];
							var kioskId = rows[i]['kioskId'];
							var title = rows[i]['title'];
							var createdAt = rows[i]['createdAt'];
							var expiresAt = rows[i]['expiresAt'];
							var beginsAt = rows[i]['beginsAt'];
							var survey = {
								surveyId:surveyId,
								userId: userId,
								kioskId: kioskId,
								title: title,
								createdAt: createdAt,
								expiresAt: expiresAt,
								beginsAt: beginsAt
							};
							survey_list.push(survey);
						}
						i++;
					}
					res.json(survey_list);
				}
				else{
					console.log(err);
				}
			});
		}
		else if(kioskId!=undefined){
			sql+=" where kioskId = "+kioskId+";";
			connection.query(sql,function(err,rows,fields){
					if(!err){
						console.log("success kioskId");
						var i =0;
						while(rows[i]!=undefined){
							if(i>=page_count&&i<next_count){
								var surveyId = rows[i]['surveyId'];
								var userId = rows[i]['userId'];
								var kioskId = rows[i]['kioskId'];
								var title = rows[i]['title'];
								var createdAt = rows[i]['createdAt'];
								var expiresAt = rows[i]['expiresAt'];
								var beginsAt = rows[i]['beginsAt'];
								var survey = {
									surveyId:surveyId,
									userId: userId,
									kioskId: kioskId,
									title: title,
									createdAt: createdAt,
									expiresAt: expiresAt,
									beginsAt: beginsAt
								};
								survey_list.push(survey);
							}
							i++;
						}
						res.json(survey_list);
					}
					else{
						console.log(err);
					}
			});
		}
		else{
			connection.query(sql,function(err,rows,fields){
					if(!err){
						console.log("success zero");
						var i =0;
						while(rows[i]!=undefined){
							if(i>=page_count&&i<next_count){
								var surveyId = rows[i]['surveyId'];
								var userId = rows[i]['userId'];
								var kioskId = rows[i]['kioskId'];
								var title = rows[i]['title'];
								var createdAt = rows[i]['createdAt'];
								var expiresAt = rows[i]['expiresAt'];
								var beginsAt = rows[i]['beginsAt'];
								var survey = {
									surveyId:surveyId,
									userId: userId,
									kioskId: kioskId,
									title: title,
									createdAt: createdAt,
									expiresAt: expiresAt,
									beginsAt: beginsAt
								};
								survey_list.push(survey);
							}
							i++;
						}
						res.json(survey_list);
					}
					else{
						console.log(err);
					}
			});
		}
});

module.exports = router;
