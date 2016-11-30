const conf = require('./db-default.js');
const mysql = require('mysql');
const connection = mysql.createConnection(conf.mysql);
let u_no = 201461551289;
connection.connect();
connection.query(`select * from test as user where u_no = '${u_no}'` , function (err, rows) {
	if(err) {
		throw err;
	}
	console.log(rows[0]);
	// console.log(rows[0].solution);
});
connection.end()
