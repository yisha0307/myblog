const { Comment } = require('../lib/mongodb')

module.exports = {
    // 发表留言
    createComment: function (content) {
        return new Promise((resolve, reject) => {
            let comment_entity = new Comment(content)
            comment_entity.save((err, doc) => {
                if (err) {
                    console.log('error ----->', err)
                    reject(err)
                } else {
                    resolve (doc)
                }
            })
        })
    },
    // 根据comment _id找comment
    findCommentById: function (_id) {
        return new Promise((resolve, reject) => {
            Comment.findOne({_id}).populate('author').exec()
        })
    },
    // 删除留言
    deleteCommentById: function (_id) {
        return new Promise((resolve, reject) => {
            Comment.findOneAndRemove({_id}).exec((err, doc) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    // 更新留言
    updateComment: function (commentId) {
        return Comment.findOneAndUpdate({_id: commentId}).exec()
    },
    // 删除文章的时候同时删除所有的comments
    deleteCommentsByPostId: function (postId) {
        return Comment.deleteMany({postId}).exec()
    },
    // 通过文章id获取所有的评论
    getComments: function (postId) {
        return Comment.find({postId}).populate('author').exec()
    },
    // 获取某一篇文章下的评论数
    getCommentsCount: function (postId) {
        return Comment.countDocuments({postId})
    }
}