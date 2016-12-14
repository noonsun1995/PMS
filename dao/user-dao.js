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
	addUsers: function insert(u_no, u_department, u_position) {
		// 确定到底插入几个数据
		let affectedRow = [];
		let notAffectedRow = [];
		return new Promise((resolve, reject) => {
			u_no.forEach(elem => {
				pool.getConnection((err, connection) => {
					connection.query(`insert into tb_users (u_no, u_department, u_position) values ('${elem}', '${u_department}', '${u_position}') on duplicate key update u_department = values(u_department), u_position = values(u_position)`, (err, result) => {
						if(err) {
							reject('err');
						} else {
							affectedRow.push(elem);
							if (affectedRow.length == u_no.length) {
								resolve('success');
							}

						}
						connection.release();
				});

				});
			})


		});
	},
	modifyInfo: function modifyedInfo(u_no, data) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query('update tb_users set u_name = ?, u_sex = ?, u_birthday = ?, u_school_college = ?, u_college_department = ?, u_tel = ?, u_qq = ?, u_place = ?, u_intro = ?, u_remark = ? where u_no = ?', [data['u_name'], data['u_sex'], data['u_birthday'], data['u_school_college'], data['u_college_department'], data['u_tel'], data['u_qq'], data['u_place'], data['u_intro'], data['u_remark'], u_no], (err, result) => {
					if(err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		});
	},
	updatePwd: function updatePwd(u_no, u_pwd) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query('update tb_users set u_password = ?',[u_pwd], (err, result) => {
					if(err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		});
	},
	queryAll: function queryAll() {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`select * from tb_users where u_is_delete <> 1`, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	queryRecycleAll: function queryAll() {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`select * from tb_users where u_is_delete = 1`, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	editUser: function editUser(department, position) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`update tb_users set u_department = ?, u_position = ?`, [department, position], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	recycleUser: function recycleUser(u_no) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`update tb_users set u_is_delete = 1 where u_no = '${u_no}'`, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	restoreUser: function recycleUser(u_no) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`update tb_users set u_is_delete = 0 where u_no = '${u_no}'`, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	deleteUser: function recycleUser(u_no) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`delete from tb_users where u_no = '${u_no}'`, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
					connection.release();
				});
			})
		})
	},
	easySearch: function easySearch(u_name) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				connection.query(`select * from tb_users where u_name = '${u_name}'`, (err, result) => {
					if (err) {
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
