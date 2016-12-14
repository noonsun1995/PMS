const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const routes = require('./routes');
// express app 实例
const app = express();
// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎ejs
app.set('view engine', 'ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 解析post的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// session 中间件
app.use(session({
  name: 'user', // cookie 中保存session id字段的名字
  secret: 'ruansongsong', // 通过设置的secret字符串，来计算hash值并放在cookie中
  cookie: {
    // 设置过期时间
    maxAge: 60 * 60 * 24 *2
  },
  resave: true, // 每次请求都重新设置session cookie
  saveUninitialized: false
})
);
// 显示通知中间件
app.use(flash());
routes(app);
app.listen(3100);
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// // require 路由
// var routes = require('./routes');
//
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// // lu
// routes(app);
// module.exports = app;
//
