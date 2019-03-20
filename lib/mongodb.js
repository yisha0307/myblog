const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')
const schema = mongoose.Schema
const Plugins = require('./plugins')
const marked = require('marked')
// mongoose.Promise = global.Promise
const db = mongoose.connect(config.mongodb, {useNewUrlParser:true})

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
    author: {type: schema.Types.ObjectId, required: true, ref: 'User'},
    title: {type: 'string', required: true},
    content: {type: 'string', required: true},
    pv: {type: 'number', default: 0}
})
postSchema.post('find',  docs => {
    docs.map(doc => {
        doc.markedContent = marked(doc.content)
        return doc
    })
})
postSchema.post('findOne', doc => {
    doc.markedContent = marked(doc.content)
})
exports.Post = new mongoose.model('Post', postSchema)