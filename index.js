const express = require('express')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')
// 利用winston和express-winston记录日志
const winston = require('winston')
const expressWinston = require('express-winston')
const app = express()



// 设置模板目录
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录 (要放在router(app)之前)
app.use(express.static(path.join(__dirname, 'public')))

// session中间件
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
// flash中间件， 用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), //上传文件目录
    keepExtensions: true
}))

// app.locals通常挂载常量信息（如博客名、描述、作者这种不会变的信息
// res.locals通常挂载变量信息（如请求者信息，res.locals.user = req.session.user）
// 设置模板全局常量 -- app.locals
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}
// 添加模板必须的三个变量 -- res.locals
// ejs里可以直接使用
app.use(function (req, res, next) {
    res.locals.user = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    next()
})
// 记录正常请求日志的中间件要放在routes(app)之前，记录错误日志的要放在routes(app)之后
// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}))
// 路由
routes(app);
// 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}))
// 监听端口，启动程序
app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
})

