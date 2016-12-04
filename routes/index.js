const checkLogin = require('../middleware/check-login').checkLogin;


module.exports = function (app) {
  app.get('/', checkLogin, (req, res) => {
    res.redirect('/user/home');
  });
  // 注册个人主页路由
    app.use('/user/home', require('./user/home'));
  // 注册登录路由
  app.use('/user/login', require('./user/login'));
  // 注册注销路由
  app.use('/user/logout', require('./user/logout'))
  // 注册添加用户路由
  app.use('/user/adduser', require('./user/adduser'));
}
