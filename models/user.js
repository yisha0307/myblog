const User = require('../lib/mongodb').User

module.exports = {
    // 注册一个用户
    add: function (user, callback) {
        var userEntity = new User(user)
        userEntity.save(callback)
        // or:
        //return User.create(user, callback)
    },
    findByName: function (name, callback) {
        
    }
}