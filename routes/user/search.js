const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const Dao = require('../../dao/user-dao.js');
const queryAll = Dao.queryAll;
const query = Dao.query;
const queryPosition = Dao.queryPosition;
const queryDepartment = Dao.queryDepartment;
const easySearch = Dao.easySearch;
const complexSearch = Dao.complexSearch;
router.get('/', checkLogin, (req, res) => {
	Promise.all([queryDepartment(), queryPosition()]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			allUsers: 0,
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		console.log(err);
	})

});

router.post('/easy-search', checkLogin, (req, res) => {
	let u_name = req.body['search-name'];
	Promise.all([queryDepartment(), queryPosition(), easySearch(u_name)]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			allUsers: data[2],
			departments: data[0],
			positions: data[1]
		})
	}).catch((err) => {
		Promise.all([queryDepartment(), queryPosition()]).then((data) => {
			res.render('index', {
				page: 'search',
				title: '查找用户',
				allUsers: 0,
				departments: data[0],
				positions: data[1]
			})
		}).catch((err) => {
			console.log(err);
		})
	})
});
router.post('/complex-search', checkLogin, (req, res) => {

	Promise.all([queryDepartment(), queryPosition(), complexSearch(req.body)]).then((data) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			allUsers: data[2],
			departments: data[0],
			positions: data[1]
	})
	}).catch((err) => {
		Promise.all([queryDepartment(), queryPosition()]).then((data) => {
			res.render('index', {
				page: 'search',
				title: '查找用户',
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
