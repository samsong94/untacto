/login.js*/
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

const secret="ThISisSecRETKeY";

router.post('/', function (req, res, next) {
    var email = req.body['email'];
    var password = req.body['password'];
    var connection = mysql.createConnection({
        host: 'localhost',
        post: 3306,
        user: 'admin',
        password: 'a103',
        database: 'project1'
	});
    connection.connect();
	
    connection.query('select * from user where email=\'' + email + '\' and password=\'' + password + '\'', function (err, rows, fields) {
        if (!err) {
            if (rows[0]!=undefined) {
				console.log("login");
				const token = jwt.sign({
					id:rows[0]['userId'],
					exp:Math.floor(Date.now()/1000) + (60*60)
				},
				secret);
				var user = {
					companyName: rows[0]['userName'],
					companyId: rows[0]['userId']
				};
				
				res.cookie('user', user);
				res.cookie('tok',token);
				res.cookie('companyName', rows[0]['userName']);
				res.cookie('companyId', rows[0]['userId']);
				res.json({
					result: 'ok',
					token
				});
			} else {
				res.status(403).json({
					message: err
				})
            }

        } else {
			res.status(403).json({
				message: err
			})
        }
    });
});

module.exports = router;

