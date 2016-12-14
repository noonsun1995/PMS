const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const Dao = require('../../dao/user-dao.js');
const queryAll = Dao.queryAll;
const query = Dao.query;
const queryPosition = Dao.queryPosition;
const queryDepartment = Dao.queryDepartment;
const editUser = Dao.editUser;
const recycleUser = Dao.recycleUser;
router.get('/', checkLogin, (req, res) => {
	queryAll().then((data) => {
		res.render('index', {
			page: 'overview',
			title: '人员概览',
			allUsers: data
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.get('/detail', checkLogin, (req, res) => {
	let u_no = req.query['u_no'];
	query(u_no).then((data) => {
		res.render('index', {
			page: 'detail',
			title: '查看信息',
			userInfo: data
		})
	})
});
router.get('/edit', checkLogin, (req, res) => {
	let u_no = req.query['u_no'];
	Promise.all([query(u_no), queryDepartment(), queryPosition()]).then((data) => {
		console.log(data);
		res.render('index', {
			page: 'edit',
			title: '修改其他人员信息',
			u_no: u_no,
			user: data[0]['u_name'],
			departments: data[1],
			positions: data[2]
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.post('/edit', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	let u_department = req.body['department'];
	let u_position = req.body['position'];
	editUser(u_department, u_position).then((data) => {
		if (data) {
			res.json({"status": "success"});
		} else {
			res.json({"status": "error"});
		}
	}).catch((err) => {
		res.json({"status": "error"});
	})
});
router.post('/recycle', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	console.log(u_no);
	recycleUser(u_no).then((data) => {
		if (data) {
			console.log('回收成功');
			res.redirect('/user/overview');
		}
	}).catch((err) => {
		console.log(err);
	})


})
module.exports = router;
