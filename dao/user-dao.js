// 对nodejs进行操作
const conf = require('../conf/db-default');
const mysql = require('mysql');
// 创建连接池
const pool  = mysql.createPool(conf.mysql);

// 操作的方法
module.exports = {
	query: function query(u_no) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
		  // Use the connection
		  connection.query(`select * from tb_users where u_no = '${u_no}'` , (err, rows) => {
					if(err) {
							reject('用户名不存在');
					} else {
						resolve(rows[0]);
					}
		    connection.release();

		    // Don't use the connection here, it has been returned to the pool.
		  });
		})
		})
	},
	queryPosition: function queryPosition() {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query('select p_name from tb_positions', (err, rows) => {
					if(err) {
						reject(err);
					} else {
						let rowsArray = [];
						for (let i = 0; i < rows.length; i++) {
							rowsArray.push(rows[i].p_name);
						}
						resolve(rowsArray);
					}
				})
			})
		})
	},
	queryDepartment: function queryDepartment() {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query('select d_name from tb_departments', (err, rows) => {
					if(err) {
						reject(err);
					} else {
						let rowsArray = [];
						for (let i = 0; i < rows.length; i++) {
							rowsArray.push(rows[i].d_name);
						}
						resolve(rowsArray);
					}
				})
			})
		})
	},
	insert: function insert(u_no, u_department, u_position) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`insert into tb_users (u_no, u_departmen, u_postion) values ('${u_no}', '${u_department}', '${u_position}')`, (err, result) => {
					if(result) {
						// console.log(result);
						resolve(result);
					} else {
						console.log(err);
						reject(err);
					}
					connection.release();
				});
			})
		});
	}
}
