const express = require('express')
const router = express.Router()
const sha1 = require('sha1')

const UserModel = require('../models/user')
const checkNotLogin = require('../middlewares/check').checkNotLogin

// POST /signin 用户登录
router.post('/', (req, res, next) => {
    const name = req.body.name
    const password = req.body.password
    // 校验参数
    try {
        if (!name.length) {
            throw new Error('请填写用户名')
        }
        if (!password.length) {
            throw new Error('请填写密码')
        }
    } catch (e) {
        const errRet = {
            "code": 200,
            "success": true,
            "retCode": '999999',
            "errMsg": e
        }
        res.send(errRet)
    }
    UserModel.findUserByName(name).then(user => {
        console.log('-----------', user)
        if (!user) {
            // req.flash('error', '用户不存在')
            // return res.redirect('back')
        }
        // 检查密码是否匹配
        if (password !== user.password) {
            // req.flash('error', '用户名或密码错误')
            // return res.redirect('back')
        }
        const ret = {
            "success": true,
            "code": 200,
            "message": "",
            "data": user
        }
        res.send(ret)

        // 用户信息写入session
        delete user.password
        req.session.user = user
    })
})

module.exports = router