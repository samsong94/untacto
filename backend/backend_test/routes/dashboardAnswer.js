/dashboardAnswer.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const url = require('url');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.use(cookieParser());

router.get('/', function(req, res, next){
	var companyId = res.locals.query.companyId; //get query from middleware

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
	var sql_count = 'select count(*) as cnt from survey where userId=\'' + companyId + '\''; 
	var sql_list = 'select surveyId, title from survey where userId=\'' + companyId + '\'';
	var sql_duration = 'select beginsAt, expiresAt from survey where userId=\'' + companyId + '\'';
	var sql_customer = 'select surveyId, customerId, count(distinct surveyId, userId, customerId) as cnt from answer where userId=\'' + companyId + '\' group by surveyId, userId, customerId';

	var x = new Array();
	var bySurvey = new Array();
	var byGender = new Array();
	var byAge = new Object();
	var begins_date = new Date();
	var expires_date = new Date();
	var duration = 0;
	var group_age_1 = new Array(); //~20
	var group_age_2 = new Array(); //20~29
	var group_age_3 = new Array(); //30~39
	var group_age_4 = new Array(); //40~49
	var group_age_5 = new Array(); //50~59
	var group_age_6 = new Array(); //60~

	function input_age(a, b, c, d, e, f){
		group_age_1.push(a);
		group_age_2.push(b);
		group_age_3.push(c);
		group_age_4.push(d);
		group_age_5.push(e);
		group_age_6.push(f);
	}
	//count survey list	
	var count_survey;
	connection.query(sql_count, function(err_count, rows_count, fields_count){
		if(!err_count){
			//console.log('count survey list');
			count_survey = rows_count[0]['cnt'];
		} else {
			throw err_count;
		}
	});

	//get begins_date and expires_date
	connection.query(sql_duration, function(err_duration, rows_duration, fields_duration){
		if(!err_duration){
			x.push('x');
			//console.log('get begins, expires dates');
			begins_date = moment(rows_duration[0]['beginsAt']).format('YYYY-MM-DD');
			expires_date = moment(rows_duration[0]['expiresAt']).format('YYYY-MM-DD');
			
			for(var i=1; i<count_survey; i++){
				tmp_begins = moment(rows_duration[i]['beginsAt']).format('YYYY-MM-DD');
				tmp_expires = moment(rows_duration[i]['expiresAt']).format('YYYY-MM-DD');
				if(begins_date > tmp_begins)
					begins_date = tmp_begins;
				if(expires_date < tmp_expires)
					expires_date = tmp_expires;
			}
			duration = (moment(expires_date) - moment(begins_date)) / (1000 * 24 * 60 * 60);
			
			//set days into 'x'
			var date = moment(begins_date);
			for(var i=0; i<=duration; i++){
				date = moment(date).format('YYYY-MM-DD');
				x.push(date);
				date = moment(date).add(1, 'days');
			}

			bySurvey.push(x);
		} else {
			throw err_duration;
		}
	});

	//set byGender, byAge
	connection.query(sql_customer, function(err_chart, rows_chart, fields_chart){
		if(!err_chart){
			console.log('gender, age');
			//count information about each customer
			group_age_1 = new Array(count_survey);
			group_age_2 = new Array(count_survey);
			group_age_3 = new Array(count_survey);
			group_age_4 = new Array(count_survey);
			group_age_5 = new Array(count_survey);
			group_age_6 = new Array(count_survey);
			
			for(var i=0; i<count_survey; i++){
				group_age_1[i] = 0;
				group_age_2[i] = 0;
				group_age_3[i] = 0;
				group_age_4[i] = 0;
				group_age_5[i] = 0;
				group_age_6[i] = 0;
			}
			count_age = new Array(6);
			/*
			console.log(byAge);	
			for(var idx=0; idx<rows_chart.length; idx++){
				var sql_customerInfo = 'select age, gender from customer where customerId=\'' + rows_chart[idx]['customerId'] + '\'';
				connection.query(sql_customerInfo, function(err_info, rows_info, fields_info){
					if(!err_info){
						//count age
						if(rows_info.length){
							var c_age = rows_info[0]['age'];
							var s_id = rows_chart[idx]['surveyId'];
						}						
					} else {
						throw err_info;
					}
				});
			}
			*/
			byAge = {
				'~20': group_age_1,
				'20~29': group_age_2,
				'30~39': group_age_3,
				'40~49': group_age_4,
				'50~59': group_age_5,
				'60~': group_age_6,
			};
			
		} else {
			throw err_chart;
		}
	});

	//set bySurvey
	connection.query(sql_list, function(err_list, rows_list, fields_list){
		if(!err_list){
			console.log('set arrays');
			//push survey title
			bySurvey.push(new Array('total'));
			for(var idx=0; idx<count_survey; idx++){
				bySurvey.push(new Array(rows_list[idx]['title']));
			}
			
			//counting by date
			for(var i=1; i<=duration+1; i++){
				var sql_answer = 'select surveyId, customerId, count(distinct surveyId, userId, customerId) as cnt from answer where userId=\'' 
					+ companyId + '\' and createdAt between \''+ x[i] + ' 00:00:00\' and \''+ x[i] + ' 23:59:59\' group by surveyId';
				connection.query(sql_answer, function(err_answer, rows_answer, fields_answer){
					if(!err_answer){
						//add idx for counting
						for(var idx=2; idx<=count_survey+1; idx++){
							bySurvey[idx].push(0);
						}
						//the number of answers of each surveys
						var sum = 0;
						if(rows_answer.length != 0){
							var obj = rows_answer;
							for(var idx=0; idx<obj.length; idx++){
								bySurvey[obj[idx]['surveyId']+1].pop();
								bySurvey[obj[idx]['surveyId']+1].push(obj[idx]['cnt']);
								sum += obj[idx]['cnt'];
							}
						}
						bySurvey[1].push(sum);
//						console.log(bySurvey);
//						console.log('----------------------------');
					} else {
						throw err_answer;
					}
				});
			}
			//send result
			connection.query(sql_list, function(err, rows, fields){
				if(!err){
					res.json({
						bySurvey: bySurvey,
						byGender: byGender,
						byAge: byAge
					});
				} else {
					throw err;
				}
			});
		} else {
			throw err_list;
		}
	});
});

module.exports = router;
