const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')
const schema = mongoose.Schema
const Plugins = require('./plugins')
mongoose.connect(config.mongodb)

// 存储用户的名称、密码（加密后的）、头像、性别和个人简介
const userSchema = new schema({
    name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    avatar: {type: 'string', required: true},
    gender: {type: 'string', enum: ['m', 'f', 'x'], default:'x'},
    bio: {type: 'string', required: true},
})
userSchema.plugin(Plugins.lastModifiedPlugin)
exports.User = new mongoose.model('User', userSchema)

// Post：存储用户发表的文章
const postSchema = new schema({
    author: {type: schema.Types.ObjectId, required: true},
    title: {type: 'string', required: true},
    content: {type: 'string', required: true},
    pv: {type: 'number', default: 0}
})

exports.Post = new mongoose.model('Post', postSchema)