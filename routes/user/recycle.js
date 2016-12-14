const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const Dao = require('../../dao/user-dao.js');
const queryRecycleAll = Dao.queryRecycleAll;
const query = Dao.query;
const recycleUser = Dao.recycleUser;
const restoreUser = Dao.restoreUser;
const deleteUser = Dao.deleteUser;
router.get('/', checkLogin, (req, res) => {
	queryRecycleAll().then((data) => {
		res.render('index', {
			page: 'recycle',
			title: '回收站',
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
router.post('/restore', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	console.log(u_no);
	restoreUser(u_no).then((data) => {
		if (data) {
			console.log('恢复成功');
			res.redirect('/user/recycle');
		}
	}).catch((err) => {
		console.log(err);
	})
})
router.post('/delete', checkLogin, (req, res) => {
	let u_no = req.body['u-no'];
	console.log(u_no);
	deleteUser(u_no).then((data) => {
		if (data) {
			console.log('删除成功');
			res.redirect('/user/recycle');
		}
	}).catch((err) => {
		console.log(err);
	})


})
module.exports = router;
