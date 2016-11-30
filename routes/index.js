const checkLogin = require('../middleware/check-login').checkLogin;
module.exports = function (app) {
  app.get('/', checkLogin, (req, res) => {
    res.render('index');
  })
  app.use('/login', require('./login'));
  app.use('/logout', require('./logout'))
}
