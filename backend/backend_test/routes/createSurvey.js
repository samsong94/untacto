/createSurvey.js*/
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path = require('path');
const moment = require('moment');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const storage=multer.diskStorage({
	destination: (req,file,cb)=>{
		cb(null, 'upload/');
	},
	filename: (req,file,cb) => {
		const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null,newFilename);
	}
});

const upload = multer({ storage });

router.post('/',upload.single('video'), function(req,res,next) {
		if(req.file!=undefined){
		console.log("upload success");
		var title = req.body['title'];
		var explain = req.body['description'];
		var selectedKiosk = req.body['selectedKiosk'];
		var duration = req.body['duration'];
		var expiresAt = moment().add(duration, 'd').format("YYYY-MM-DD hh:mm:ss");
		let file = req.file;
		var userId = res.locals.userId;
		var videoPath = path.join(__dirname+'/../'+file.path);
		var connection = mysql.createConnection({
			host: 'localhost',
			post: 3306,
			user: 'admin',
			password: 'a103',
			database: 'project1'
			});
		connection.connect();
		var sql = 'select COUNT(*) as num from survey where companyId='+userId+';'
		connection.query(sql,function(err,rows,fields){
			var num=rows[0]['num']+1;
			sql = 'insert into survey (surveyId,userId,title,kioskId,video,description_survey,expiresAt) values('+num+','+userId+',"'+title+'","'+selectedKiosk+'","'+videoPath+'","'+explain+'","'+expiresAt+'");';
			connection.query(sql,function(err){
				connection.end();
				if(!err){
						console.log("insert success");
					res.json({
						result: "ok"
					});
				}
				else{
					console.log("insert error");
					console.log(err);
					res.status(403).json({
						message: err
					});
				}
			});
		});
		}
		else{
			console.log("upload fail");
			res.status(403).json({
				message:"error"
			});
		}
});
module.exports = router;
