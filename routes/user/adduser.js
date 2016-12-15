const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/user-dao');
const addUsers = Dao.addUsers;
const queryPositionNames = Dao.queryPositionNames;
const queryDepartmentNames = Dao.queryDepartmentNames;
router.get('/', checkLogin, checkPermission, (req, res) => {
	Promise.all([queryDepartmentNames(), queryPositionNames()]).then((data) => {
		res.render('index', {
			page: 'adduser',
			title: '增加用户',
			checkPermission: req.permisson,
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.post('/', checkLogin, checkPermission, (req, res, next) => {
	let users = req.body['users'];
	let department = req.body['department'];
	let position = req.body['position'];
	// user字符串转变为数组
	users = users.split('\r\n');
	console.log(users);
	if(req.permisson < 2) {
		addUsers(users, department, position).then((data) => {
			if (data == 'success') {
				res.json({"status": "success"});
			} else {
				res.json({"status": "error"});
			}
		}).catch((err) => {
			console.log(err);
			res.json({"status": "error"});
		})
	} else {
		res.json({"status": "error"});
	}
	// console.log(req.body['users']);

})
module.exports = router;
