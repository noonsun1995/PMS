// 对nodejs进行操作
const conf = require('../conf/db-default');
const mysql = require('mysql');
const connection = mysql.createConnection(conf.mysql);
connection.connect();
// 操作的方法
module.exports = {
	queryPwd: function queryPwd(u_no) {
		return new Promise((resolve, reject) => {
			connection.query(`select * from test where u_no = '${u_no}'` , function (err, rows) {
				if(err) {
						reject('用户名不存在');
				} else {
					resolve(rows[0]);
				}
			});
			connection.end()
		})

	}
}
