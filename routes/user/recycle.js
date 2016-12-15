const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/user-dao.js');
const queryRecycleAll = Dao.queryRecycleAll;
const query = Dao.query;
const recycleUser = Dao.recycleUser;
const restoreUser = Dao.restoreUser;
const deleteUser = Dao.deleteUser;
router.get('/', checkLogin, checkPermission, (req, res) => {
	queryRecycleAll().then((data) => {
		res.render('index', {
			page: 'recycle',
			title: '回收站',
			checkPermission: req.permisson,
			allUsers: data
		})
	}).catch((err) => {
		console.log(err);
	})
});
router.get('/detail', checkLogin, checkPermission, (req, res) => {
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
router.post('/restore', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	restoreUser(u_no).then((data) => {
		if (data) {
			res.redirect('/user/recycle');
		}
	}).catch((err) => {
		console.log(err);
	})
})
router.post('/delete', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	deleteUser(u_no).then((data) => {
		if (data) {
			res.redirect('/user/recycle');
		}
	}).catch((err) => {
		console.log(err);
	})


})
module.exports = router;
