const Post = require('../lib/mongodb').Post

module.exports = {
    add: function (post, callback) {
        const postEntity = new Post(post)
        return postEntity.save(callback)
    }
}