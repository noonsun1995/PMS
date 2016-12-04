const express = require('express');
const router = express.Router();
const checkLogin = require('../../middleware/check-login').checkLogin;
const query = require('../../dao/user-dao').query;
router.get('/', checkLogin, (req, res) => {
	let u_no =  req.session.user;
	query(u_no).then((data) => {
		res.render('index', {
			page: 'userhome',
			userName: data['u_name'],
			userDepartment: data['u_department'],
			userPosition: data['u_position']
		});
	}).catch((err) => {
		console.log(err);
	})
});
module.exports = router;
// res.render('index', {
//     title: req.session.user
//   });
// query('201461551289').then((data) => {
// 	res.render('index', {
// 		userName: data['u_name'],
// 		userDepartment: data['u_department'],
// 		userPosition: data['u_position']
// 	});
// }).catch((err) => {
// 	console.log(err);
// })
//
// })
