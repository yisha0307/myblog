const config = require('config-lite')(__dirname)
const Mongolass = require("mongolass")
const mongolass = new Mongolass()
const moment = require('moment')
const objectIdToTimeStamp = require('objectid-to-timestamp')
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

// 文章模型设计
exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId, required: true},
    title: {type: 'string', required: true},
    content: {type: 'string', required: true},
    pv: {type:'number', default: 0}
})
// 按照创建时间降序查看用户的文章列表
exports.Post.index({ author: 1, _id: -1}).exec()

//根据id生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: results => {
        results.forEach(item => {
            item.created_at = moment(objectIdToTimeStamp(item._id)).format('YYYY-MM-DD HH:mm')
        })
        return results
    },
    afterFindOne: result => {
        if (result) {
            result.created_at = moment(objectIdToTimeStamp(result._id)).format('YYYY-MM-DD HH:mm')
        }
        return result
    }
})