const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const fs = require('fs')

router.get('/initData', (req, res, next) => {
    console.log(req.session)
    let ret = {
        "success": true,
        "code": 200,
        "session": req.session.user || {}
    }
    res.send(ret)
})

router.post('/signup', (req, res, next) => {
    const {name, password, bio, avatar, gender} = req.body
    let user = {
        name,
        password,
        gender,
        bio,
        avatar
    }
    // 用户信息写入数据库
    UserModel.add(user).then(doc => {
        let uuser = doc
        // 删除密码这种敏感信息，将用户信息存入 session
        delete uuser.password
        req.session.user = user
        let ret = {
            "retCode": "000000",
            "userId" : doc._id
        }
        res.send(ret)
    }).catch(e => {
        fs.unlinkSync(req.files.avatar.path)
        let ret = {
            "retCode": "999999",
            "retMsg": "用户名被占用"
        }
        res.send(ret)
    })
})

module.exports = router