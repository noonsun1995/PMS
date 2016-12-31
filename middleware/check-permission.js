const query = require('../dao/user-dao').query;
module.exports = {
	checkPermission: function checkPermission (req, res, next) {
		query(req.session.user).then((data) => {
			req.permisson = data['u_permission'];
			next();
		}).catch((err) => {
			console.log(err);
		})
	}
}
