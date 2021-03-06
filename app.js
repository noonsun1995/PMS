const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout')
const routes = require('./routes');
const compression = require('compression');
// express app 实例
const app = express();
// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎ejs
app.set('view engine', 'ejs');
app.set('view cache', true);
// 设置静态文件目录, 设置缓存
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 86400000
}));

// 开启gzip
app.use(compression());
// 设置超时
app.use(timeout(5000));
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
routes(app);
app.listen(3100);
