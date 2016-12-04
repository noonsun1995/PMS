const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const insert = require('../../dao/user-dao').insert;
const queryPosition = require('../../dao/user-dao').queryPosition;
const queryDepartment = require('../../dao/user-dao').queryDepartment;
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
	let users = req.body['users'];
	let position = req.body['position'];
	// user字符串转变为数组
	users = users.split('\r\n');
	// console.log(users);
	let result = users.every((item, index, array) => {
		return insert(item, position)
	})
	for (let i = 0; i < users.length; i++) {
		insert(users[i], department).then((data) => {
			console.log(data);
		}).catch((err) => {
			console.log(err);
		})
	}
	// console.log(req.body['users']);

})
module.exports = router;
