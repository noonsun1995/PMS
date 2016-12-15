const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/user-dao.js');
const queryAll = Dao.queryAll;
const query = Dao.query;
const queryPositionNames = Dao.queryPositionNames;
const queryDepartmentNames = Dao.queryDepartmentNames;
const queryAllDepartments = Dao.queryAllDepartments;
const queryAllPositions = Dao.queryAllPositions;
const editUser = Dao.editUser;
const recycleUser = Dao.recycleUser;
const deleteDepartment = Dao.deleteDepartment;
const deletePosition = Dao.deletePosition;
router.get('/users', checkLogin, checkPermission, (req, res) => {
	queryAll().then((data) => {
		res.render('index', {
			page: 'overviewUsers',
			title: '人员概览',
			checkPermission: req.permisson,
			allUsers: data
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.get('/detail', checkLogin,checkPermission, (req, res) => {
	let u_no = req.query['u_no'];
	query(u_no).then((data) => {
		res.render('index', {
			page: 'detail',
			title: '查看信息',
			checkPermission: req.permisson,
			userInfo: data
		})
	})
});
router.get('/edit', checkLogin, checkPermission, (req, res) => {
	let u_no = req.query['u_no'];
	Promise.all([query(u_no), queryDepartmentNames(), queryPositionNames()]).then((data) => {
		res.render('index', {
			page: 'edit',
			title: '修改其他人员信息',
			checkPermission: req.permisson,
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
	recycleUser(u_no).then((data) => {
		if (data) {
			res.redirect('/user/overview/users');
		}
	}).catch((err) => {
		console.log(err);
	})
});
// 部门操作
router.get('/departments', checkLogin, checkPermission, (req, res) => {
	queryAllDepartments().then((data) => {
		res.render('index', {
			page: 'overviewDepartments',
			title: '部门概览',
			checkPermission: req.permisson,
			allDepartments: data
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.post('/departments/delete', checkLogin, checkPermission, (req, res) => {
	let d_no = req.body['d-no'];
	console.log(d_no);
	deleteDepartment(d_no).then((data) => {
		if (data) {
			console.log('删除成功');
			res.redirect('/user/overview/departments');
		}
	}).catch((err) => {
		console.log(err);
	})
});
// 职位操作
router.get('/positions', checkLogin, checkPermission, (req, res) => {
	queryAllPositions().then((data) => {
		res.render('index', {
			page: 'overviewPositions',
			title: '职位概览',
			checkPermission: req.permisson,
			allPositions: data
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.post('/positions/delete', checkLogin, checkPermission, (req, res) => {
	let p_no = req.body['p-no'];
	console.log(p_no);
	deletePosition(p_no).then((data) => {
		if (data) {
			console.log('删除成功');
			res.redirect('/user/overview/positions');
		}
	}).catch((err) => {
		console.log(err);
	})
});
module.exports = router;
