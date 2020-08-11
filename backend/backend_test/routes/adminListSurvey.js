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
		var sql_user = "select * from user where userId = ";
		var sql_kiosk = "select * from kiosk where kioskId = ";
		var survey_list = new Array();
		var page_count = page*10;
		var next_count = (page+1)*10;
		if(userId!=undefined&&kioskId!=undefined){
			sql+=" where userId = "+userId+" and kioskId = "+kioskId+";";
		}
		else if(userId!=undefined){
			sql+=" where userId = "+userId+";";
		}
		else if(kioskId!=undefined){
			sql+=" where kioskId = "+kioskId+";";
		}
		var surveyId=new Array();
		userId = new Array();
		kioskId = new Array();
		var title = new Array();
		var createdAt = new Array();
		var expiresAt = new Array();
		var beginsAt = new Array();
		connection.query(sql,function(err,rows,fields){
			if(!err){
				var i =0;
				while(rows[i]!=undefined){
					if(i>=page_count&&i<next_count){
						surveyId.push(rows[i]['surveyId']);
						userId.push(rows[i]['userId']);
						kioskId.push(rows[i]['kioskId']);
						title.push(rows[i]['title']);
						createdAt.push(rows[i]['createdAt']);
						expiresAt.push(rows[i]['expiresAt']);
						beginsAt.push(rows[i]['beginsAt']);
					}
					i++;
				}
				i = 0;
				while(userId[i]!=undefined){
					var user, kiosk;
					sql_user_tmp=sql_user+userId[i];
					sql_kiosk_tmp=sql_kiosk+kioskId[i];
					connection.query(sql_user_tmp,function(err2,rows2,fields2){
							if(!err2){
								console.log("user select success");
								var userName = rows2[0]['userName'];
								var email = rows2[0]['email'];
								var createdAt_user = rows2[i]['createdAt'];
								user = {
									userId: userId,
									userName: userName,
									email: email,
									createdAt: createdAt_user
								};
							}
							else{
								console.log("user select error");
								
							}
					});
					connection.query(sql_kiosk_tmp,function(err2,rows2,fields2){
							if(!err2){
								console.log("kiosk select success");
								var location = rows2[0]['location'];
								kiosk = {
									kioskId: kioskId,
									location: location
								};
								var survey = {
									surveyId:surveyId,
									user:user,
									kiosk:kiosk,
									title:title,
									createdAt:createdAt,
									expiresAt:expiresAt,
									beginsAt:beginsAt
								};
								survey_list.push(survey);
								console.log(survey_list);
								if(userId[i+1]==undefined){
									res.json(survey_list);
								}
							}
							else{
								console.log("kiosk select error");
							}
					});
					i++;
				}
			}
			else{
				console.log(err);
			}
		});
		
});

module.exports = router;
