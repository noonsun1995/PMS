const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/user-dao.js');
const queryAll = Dao.queryAll;
const query = Dao.query;
const queryPositionNames = Dao.queryPositionNames;
const queryDepartmentNames = Dao.queryDepartmentNames;
const easySearch = Dao.easySearch;
const complexSearch = Dao.complexSearch;
router.get('/', checkLogin, checkPermission, (req, res) => {
	Promise.all([queryDepartmentNames(), queryPositionNames()]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			checkPermission: req.permisson,
			allUsers: 0,
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		console.log(err);
	})

});

router.post('/easy-search', checkLogin, checkPermission, (req, res) => {
	let u_name = req.body['search-name'];
	Promise.all([queryDepartmentNames(), queryPositionNames(), easySearch(u_name)]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			checkPermission: req.permisson,
			allUsers: data[2],
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		Promise.all([queryDepartmentNames(), queryPositionNames()]).then((data) => {
			res.render('index', {
				page: 'search',
				title: '查找用户',
				checkPermission: req.permisson,
				allUsers: 0,
				departments: data[0],
				positions: data[1]
			})
		}).catch((err) => {
			console.log(err);
		})
	})
});
router.post('/complex-search', checkLogin,	checkPermission, (req, res) => {

	Promise.all([queryDepartmentNames(), queryPositionNames(), complexSearch(req.body)]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			checkPermission: req.permisson,
			allUsers: data[2],
			departments: data[0],
			positions: data[1]
	})
	}).catch((err) => {
		Promise.all([queryDepartmentNames(), queryPositionNames()]).then((data) => {
			res.render('index', {
				page: 'search',
				title: '查找用户',
				checkPermission: req.permisson,
				allUsers: 0,
				departments: data[0],
				positions: data[1]
			})
		}).catch((err) => {
			console.log(err);
		})
	})

})
module.exports = router;
