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
  // 注册修改个人信息路由
  app.use('/user/modify-user-info', require('./user/modify-user-info'));
  // 注册全部人员预览路由
  app.use('/user/overview', require('./user/overview'));
  // 注册回收站路由
  app.use('/user/recycle', require('./user/recycle'));
  // 注册查询路由
  app.use('/user/search', require('./user/search'));
  // 注册管理员路由
  app.use('/user/admin', require('./admin/admin'));
}
