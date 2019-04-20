var express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
var app = express();
var bodyParser = require('body-parser')
const routes = require('./routes/index')

app.use(bodyParser.json())

// session中间件
// 在req中添加session对象
app.use(session({
  name: config.session.key, // 设置cookie中保存session id的字段名称
    secret: config.session.secret, // 通过设置secret 来计算hash值并放在cookie中，使产生的signedCookie防篡改
    resave: true, // 强制更新session
    saveUninitialized: false, // 设置为false, 强制创建一个session, 即使用户未登录
    cookie: {
        maxAge: config.session.maxAge // 过期时间
    },
    store: new MongoStore({
        url: config.mongodb // 将session 储存到mongodb
    })
}))
//注册路由
routes(app)

// routes(app)
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
