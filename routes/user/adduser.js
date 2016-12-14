const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const Dao = require('../../dao/user-dao');
const addUsers = Dao.addUsers;
const queryPosition = Dao.queryPosition;
const queryDepartment = Dao.queryDepartment;
router.get('/', checkLogin, (req, res) => {
	Promise.all([queryDepartment(), queryPosition()]).then((data) => {
		console.log(data);
		res.render('index', {
			page: 'adduser',
			title: '增加用户',
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		console.log(err);
	})
	// queryPosition().then((data) => {
	//
	// }).catch((err) => {
	// 	console.log(err);
	// })
});
router.post('/', checkLogin, (req, res, next) => {
	console.log(req.body);
	let users = req.body['users'];
	let department = req.body['department'];
	let position = req.body['position'];
	// user字符串转变为数组
	users = users.split('\r\n');
	console.log(users);
	// console.log(users);
	// let result = users.every((item, index, array) => {
	// 	return insert(item, department, position);
	// })

		addUsers(users, department, position).then((data) => {
				console.log(data);
			if (data == 'success') {

				res.json({"status": "success"});
			} else {
				res.json({"status": "error"});
			}
		}).catch((err) => {
			console.log(err);
			res.json({"status": "error"});
		})

	// console.log(req.body['users']);

})
module.exports = router;
