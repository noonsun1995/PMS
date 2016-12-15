const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const checkPermission = require('../../middleware/check-permission').checkPermission;
const query = require('../../dao/user-dao').query;
router.get('/', checkLogin, checkPermission, (req, res, next) => {
	// console.log(req.permisson);
	let u_no =  req.session.user;
	query(u_no).then((data) => {
		res.render('index', {
			page: 'userhome',
			userName: data['u_name'],
			checkPermission: req.permisson,
			userDepartment: data['u_department'],
			userPosition: data['u_position']
		});
	}).catch((err) => {
		console.log(err);
	})
});
module.exports = router;
