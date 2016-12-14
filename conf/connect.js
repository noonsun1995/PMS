const conf = require('./db-default.js');
const mysql = require('mysql');
const connection = mysql.createConnection(conf.mysql);
let u_no = 201461551289;
let a;
connection.connect();
connection.query(`select * from tb_users` , function (err, rows) {
	if(err) {
		throw err;
	}
	// a = rows[0];
	// console.log(a);
	console.log(rows);
	let b = Array.prototype.slice.call(rows);
	console.log(b[0]['u_name']);
});
connection.end();
