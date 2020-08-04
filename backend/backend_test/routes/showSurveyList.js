/showSurveyList.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', function(req, res, next){
	var companyId = req.cookies.companyId;
	var connection = mysql.createConnection({
			host: 'localhost',
			post: 3306,
			user: 'admin',
			password: 'a103',
			database: 'project1'		
	});
	connection.connect();

	var sql_count = 'select count(*) as cnt from survey where userId=\'' + companyId + '\''; 
	var sql_list = 'select * from survey where userId=\'' + companyId + '\'';
	var sql_company = 'select * from user where userId=\'' + companyId + '\'';
	var sql_kiosk = 'select * from kiosk';
	var sql_kiosk_count = 'select count(*) as k_cnt from kiosk';

	//count kiosk list
	var k_cnt;
	connection.query(sql_kiosk_count, function(err_k_cnt, rows_k_cnt, fields_k_cnt){
		if(!err_k_cnt){
			console.log('count kiosk list');
			k_cnt = rows_k_cnt[0]['k_cnt'];
		} else {
			throw err_k_cnt;
		}
	});
	//get kiosk list
	var kiosk = new Array();
	connection.query(sql_kiosk, function(err_kiosk, rows_kiosk, fields_kiosk){
		if(!err_kiosk){
			console.log('get kiosk list');
			for(var i=0; i<k_cnt; i++){
				kiosk.push(rows_kiosk[i]);
			}
		} else {
			throw err_kiosk;
		}
	});
	//count survey list	
	var count_survey;
	connection.query(sql_count, function(err_count, rows_count, fields_count){
		if(!err_count){
			console.log('count survey list');
			count_survey = rows_count[0]['cnt'];
		} else {
			throw err_count;
		}
	});
	//get information about a company
	var company_information = new Object();
	connection.query(sql_company, function(err_company, rows_company, fields_company){
		if(!err_company){
			console.log('get information about a company');
			//for converting from 'user*' to 'company*'
			company_information = rows_company[0];
			company_information.companyId = company_information.userId;
			company_information.companyName = company_information.userName; 
			delete company_information.userId;
			delete company_information.userName;

		} else {
			throw err_company;
		}
	});	
	//set state in surveys 
	connection.query(sql_list, function(err_list, rows_list, fields_list){
		if(!err_list){
			console.log('set state in surveys');

			var companyObj = new Object();
			var survey_list = new Array();
			for(var i=0; i<count_survey; i++){
				var kioskId = rows_list[i].kioskId;
				delete rows_list[i].companyId;
				delete rows_list[i].userId;
				delete rows_list[i].kioskId;
				rows_list[i].company = JSON.stringify(company_information);
				rows_list[i].companyId = companyId;
				rows_list[i].kiosk = JSON.stringify(kiosk[kioskId]);
				survey_list.push(rows_list[i]);
			}
			companyObj.surveyList = survey_list;
			console.log(companyObj);
			res.json(companyObj);
		} else {
			throw err_list;
		}
	});
});

module.exports = router;
