// 对nodejs进行操作
const conf = require('../conf/db-default');
const mysql = require('mysql');
// 创建连接池
const pool  = mysql.createPool(conf.mysql);

// 操作的方法
module.exports = {
	addDepartment: function addDepartment(d_name, d_intro, d_remark) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
		  // Use the connection
		  connection.query(`insert into tb_departments (d_name, d_intro, d_remark) values ('${d_name}', '${d_intro}', '${d_remark}') on duplicate key update d_intro = values(d_intro), d_remark = values(d_remark)` , (err, result) => {
					if(err) {
							reject(err);
					} else {
						resolve(result);
					}
		    connection.release();
		  });
		})
		})
	},
	addPosition: function addPosition(p_name, p_intro, p_remark, p_permission) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
			// Use the connection
			connection.query(`insert into tb_positions (p_name, p_intro, p_remark, p_permission) values ('${p_name}', '${p_intro}', '${p_remark}', '${p_permission}') on duplicate key update p_intro = values(p_intro), p_remark = values(p_remark), p_permission = values(p_permission)` , (err, result) => {
					if(err) {
							reject(err);
					} else {
						resolve(result);
					}
				connection.release();
			});
		})
		})
	}


}
