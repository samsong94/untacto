/surveyDetailAnswer.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/',function(req,res,next){
	var userId = res.locals.userId;
	var surveyId= res.locals.id;
	var connection = mysql.createConnection({
		host: 'localhost',
		post: 3306,
		user: 'admin',
		password: 'a103',
		database: 'project1'
	});
	connection.connect();
	var sql = "select emotions,timeIndex,customerId from answer where userId = "+ userId + " and surveyId = "+ surveyId +" order by timeIndex asc;";
	var sql1 = "select COUNT(*) as cnt from answer where userId = " + userId+" and surveyId= " + surveyId+";";
	var sql2 = "select COUNT(distinct customerId) as max from answer where userId = "+ userId+" and surveyId= " + surveyId+";";
	var sql3 = "select MAX(timeIndex) as max from user where userId= "+userId+" and surveyId= " +surveyId+";";
	var sql4 = "select distinct customerId from answer where userId= "+userId+" and surveyId= "+surveyId+";";
	var sql5 = "select customerId from customer where gender = 'male' and (";
	var sql6 = "select customerId from customer where gender = 'female' and (";

	var anger = new Array();
	var contempt = new Array();
	var disgust = new Array();
	var fear = new Array();
	var happiness = new Array();
	var neutral = new Array();
	var sadness = new Array();
	var surprise = new Array();
	var customers = new Array();
	var customer_female = new Array();
	var customer_male = new Array();
	var customer_young = new Array();
	var customer_old = new Array();
	var cnt;
	var customer_cnt;
	var max_timer;
	var all, male, female, young, old;
	connection.query(sql1,function(err,rows,fields){
			if(!err){
				cnt = rows[0]['cnt'];
			}
	});
	connection.query(sql2,function(err,rows,fields){
			if(!err){
				customer_cnt=rows[0]['max'];
			}
	});
	connection.query(sql3,function(err,rows,fields){
			if(!err){
				max_timer=rows[0]['max'];
			}
	});
	connection.query(sql4,function(err,rows,fields){
			if(!err){
				for(var i =0; i<customer_cnt; i++){
					customers.push(rows[i]['customerId']);
					sql5+=" customerId = "+rows[i]['customerId'];
					sql6+=" customerId = "+rows[i]['customerId'];
					if(i!=customer_cnt-1){
						sql5+=" or";
						sql6+=" or";
					}
				}
				sql5+=");";
				sql6+=");";

				//male chart
				connection.query(sql5,function(err2,rows2,fields2){
						if(!err){
							
						}
						else{
						}
				}
			}
	});
	connection.query(sql,function(err,rows,fields){
			if(!err){
				console.log("select emotion success");
				var emotions = new Array();
				for(var i =0; i<cnt; i++){
					var emotion=JSON.parse(rows[i]['emotions']);
					emotions.push(emotion);
				}
				//All user's emotion sum during 15sec. This is for firstChart
				for(var i =0; i<cnt; i++){
					var sum_anger = 0;
					var sum_contempt = 0;
					var sum_disgust =0;
					var sum_fear = 0;
					var sum_happiness =0;
					var sum_neutral = 0;
					var sum_sadness = 0;
					var sum_surprise =0;
					for(var j=0; j<customer_cnt; j++){
						sum_anger+=emotions[i].anger;
						sum_contempt+=emotions[i].contempt;
						sum_disgust+=emotions[i].disgust;
						sum_fear+=emotions[i].fear;
						sum_happiness+=emotions[i].happiness;
						sum_neutral+=emotions[i].neutral;
						sum_sadness+=emotions[i].sadness;
						sum_surprise+=emotions[i].surprise;
						if(j!=customer_cnt-1)
							i++;
					}
					anger.push(sum_anger/customer_cnt);
					contempt.push(sum_contempt/customer_cnt);
					disgust.push(sum_disgust/customer_cnt);
					fear.push(sum_fear/customer_cnt);
					happiness.push(sum_happiness/customer_cnt);
					neutral.push(sum_neutral/customer_cnt);
					sadness.push(sum_sadness/customer_cnt);
					surprise.push(sum_surprise/customer_cnt);
					console.log(anger);
				}
				all={
					anger:anger,
					contempt: contempt,
					disgust: disgust,
					fear: fear,
					happiness: happiness,
					neutral: neutral,
					sadness: sadness,
					surprise: surprise
				};
			}
			else{
				console.log("select emotion error");
				console.log(err);
			}
	});
});

module.exports = router;
