const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const Dao = require('../../dao/user-dao.js');
const queryAll = Dao.queryAll;
const query = Dao.query;
const queryPosition = Dao.queryPosition;
const queryDepartment = Dao.queryDepartment;
const easySearch = Dao.easySearch;
router.get('/', checkLogin, (req, res) => {
	res.render('index', {
		page: 'search',
		title: '查找用户',
		allUsers: 0
	})
});
router.post('/easy-search', checkLogin, (req, res) => {
	let u_name = req.body['u-name'];
	easySearch(u_name).then((data) => {
		if(data) {
			res.render('index', {
				page: 'search',
				title: '查找用户',
				allUsers: data
			})
		}
	}).catch((err) => {
		res.render('index', {
			page: 'search',
			title: '查找用户',
			allUsers: 0
		})
	})

});
module.exports = router;
