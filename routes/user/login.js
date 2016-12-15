const express = require('express');
const router = express.Router();
const checkNotLogin = require('../../middleware/check-login').checkNotLogin;
const query = require('../../dao/user-dao').query;
// 获取登录页面 user/login
router.get('/', checkNotLogin, (req, res, next) => {
  res.render('user/login');
});
// 获取登录页面post的数据，/user/login
router.post('/', checkNotLogin, (req, res, next) => {
  // 获取到请求的学号和密码
  let u_no = req.body['user-no'];
  let u_pwd = req.body['user-pwd'];
  query(u_no).then((data) => {
    console.log(data['u_password']);
    // 验证密码是否正确
    if(u_pwd == data['u_password']) {
      console.log('密码正确');
      // 写入session
      req.session.user = data['u_no'];

      res.json({"status": "success"});
    } else {
      res.json({"status": "error"});
    }
  }).catch((err) => {
    res.json({"status": "error"});
  })
})
module.exports = router;
