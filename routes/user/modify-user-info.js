const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const Dao = require('../../dao/user-dao');
const query = Dao.query;
const modifyInfo = Dao.modifyInfo;
const updatePwd = Dao.updatePwd;
router.get('/', checkLogin, checkPermission, (req, res) => {
	res.render('index', {
		page: 'modifyUserInfo',
		title: '修改个人信息',
		checkPermission: req.permisson
	});
});
router.get('/set-default-data', checkLogin, (req, res) => {
	query(req.session.user).then((data) => {
		res.json(data);
	}).catch((err) => {
		console.log(err);
	})
})
router.post('/basic-info', checkLogin, (req, res) => {
	modifyInfo(req.session.user, req.body).then((data) => {
		if(data){
			res.json({"status": "success"});
		}
	}).catch((err) => {
		res.json({"status": "error"});
	})
});
router.post('/secure-info', checkLogin, (req, res) => {
	updatePwd(req.session.user, req.body['u_new_password']).then((data) => {
		if(data){
			res.json({"status": "success"});
		}
	}).catch((err) => {
		res.json({"status": "error"});
	})
})
module.exports = router;
