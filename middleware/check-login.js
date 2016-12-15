module.exports = {
	// 检查是否登录，没有登录则重定向登录页面
	checkLogin: function checkLogin(req, res, next) {

		if(!req.session.user) {
			console.log('未登录');
			return res.redirect('/user/login');
		}
		// req.permisson = 1;
		next();
	},
	// 检查是否登录，有登录则重定向之前的页面
	checkNotLogin: function checkNotLogin(req, res, next) {
		// console.log(req.query);
		if(req.session.user) {
			console.log('已经登录');
			return res.redirect('/');
		}
		// req.permisson = 1;
		next();
	}
}
