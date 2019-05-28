const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const fs = require('fs')
const path = require('path')

router.get('/initData', (req, res, next) => {
    console.log(req.session)
    let ret = {
        "success": true,
        "code": 200,
        "session": req.session.user || {}
    }
    res.send(ret)
})

router.post('/uploadImg', (req, res, next) => {
    // console.log(req.files.file.path)
    let img = req.files.file.path.split(path.sep).pop()
    res.send({
        retCode: '000000',
        imgUrl: img
    })
})

router.post('/signup', (req, res, next) => {
    console.log('1111111')
    let {name, password, bio, avatar, gender} = req.body
    console.log('--------', req.body)
    let user = {
        name,
        password,
        gender,
        bio,
        avatar
    }
    console.log('--------', user)
    // 用户信息写入数据库
    UserModel.add(user).then(doc => {
        console.log(doc)
        let uuser = doc
        // 删除密码这种敏感信息，将用户信息存入 session
        delete uuser.password
        req.session.user = doc
        let ret = {
            "retCode": "000000",
            "userId" : doc._id
        }
        res.send(ret)
    }).catch(e => {
        console.log(e)
        let ret = {
            "retCode": "999999",
            "retMsg": "用户名被占用"
        }
        res.send(ret)
    })
})

module.exports = router