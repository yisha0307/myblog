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
    }
}