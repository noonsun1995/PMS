const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/admin-dao');
const addDepartment = Dao.addDepartment;
const addPosition = Dao.addPosition;
router.get('/add-department', checkLogin, checkPermission, (req, res, next) => {
	res.render('index', {
		page: 'addDepartment',
		title: '增加部门',
		checkPermission: req.permisson,
	});
});
router.post('/add-department', checkLogin, checkPermission, (req, res, next) => {
	let departmentName = req.body['department-name'];
	let departmentIntro = req.body['department-intro'];
	let departmentRemark = req.body['department-remark'];
	console.log(departmentName);
	if(req.permisson == 0){
		addDepartment(departmentName, departmentIntro, departmentRemark).then((data) => {
			if (data) {
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
});
router.get('/add-position', checkLogin, checkPermission, (req, res, next) => {
	res.render('index', {
		page: 'addPosition',
		title: '增加职位',
		checkPermission: req.permisson,
	});
});
router.post('/add-position', checkLogin, checkPermission, (req, res, next) => {
	let positionName = req.body['position-name'];
	let positionIntro = req.body['position-intro'];
	let positionRemark = req.body['position-remark'];
	let positionPermission = req.body['position-permission'];
	console.log(positionName);
	if(req.permisson == 0){
		addPosition(positionName, positionIntro, positionRemark, positionPermission).then((data) => {
			if (data) {
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
});
module.exports = router;
