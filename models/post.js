const Post = require('../lib/mongodb').Post
module.exports = {
    // add: function (post, callback) {
    //     const postEntity = new Post(post)
    //     return postEntity.save(callback)
    // }
    // 发表文章 改成promise
    add: function (post) {
        return new Promise((resolve, reject) => {
            let postEntity = new Post(post)
            postEntity.save((err, doc) => {
                if (err) {
                    console.log('error caused -->', err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    findAllPosts: function () {
        return new Promise ((resolve, reject) => {
            Post.find()
        })
    },
    findPostById: function (_id) {
        return Post.findOne({_id: _id}).populate('author')
    },
    findPosts: function (author) {
        return new Promise ((resolve, reject) => {
            const query = {}
                if (author) {
                query.author = author
            }
            Post.find(query).sort({_id: -1}).populate('author').exec((err, docs) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },
    // 增加点击量
    incPV: function (id) {
        return Post.updateOne({_id: id}, {$inc: {pv: 1}})
    },
    // 通过文章id获取一篇原生文章（编辑文章）
    getRawPostById: function (postId) {
        return new Promise((resolve, reject) => {
            Post.findOne({_id: postId}).populate('author').exec((err, doc) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    // 通过id更新一篇文章
    updatePostById: function (postId, data) {
        return new Promise((resolve, reject) => {
            // {new: true} 表示返回的是改后的doc
            Post.findOneAndUpdate({_id: postId}, {$set: data}, {new: true}).populate('author').exec((err, doc) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    // 通过id删除一篇文章
    deletePostById: function (postId) {
        return new Promise((resolve, reject) =>{
            Post.findOneAndRemove({_id: postId}).populate('author').exec((err, doc) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    }
}