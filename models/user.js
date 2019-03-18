const User = require('../lib/mongodb').User

module.exports = {
    // 注册一个用户
    // 改成promise
    add: function (user) {
        return new Promise((resolve, reject) => {
            let user_entity = new User(user)
            user_entity.save((err, doc) => {
                if (err) {
                    console.log('create error -->', err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    findUserByName: function (name) {
        return new Promise((resolve, reject) => {
            User.findOne({name}, (err, doc) => {
                if (err) {
                    console.log('error -->', err)
                    reject(err)
                } else {
                    resolve(doc)
                }
            })
        })
    },
    getPosts: function (author) {
        return new Promise((resolve, reject) => {
            const query = {author}
            User.find(query, (err, docs) => {
                if (err) {
                    console.log('error --> ',err)
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    }
}