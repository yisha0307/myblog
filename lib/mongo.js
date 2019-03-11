const config = require('config-lite')(__dirname)
const Mongolass = require("mongolass")
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 存储用户的名称、密码（加密后的）、头像、性别和个人简介
exports.User = mongolass.model('User', {
    name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    avatar: {type: 'string', required: true},
    gender: {type: 'string', enum: ['m', 'f', 'x'], default: 'x'},
    bio: {type: 'string', required: true}
})

// 根据用户名找到用户，用户名全局唯一
exports.User.index({name: 1}, {unique: true}).exec()