const express = require('express')
const router = express.Router()

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
            "retMsg": e
        }
        res.send(errRet)
    }
    UserModel.findUserByName(name).then(user => {
        if (!user) {
            const errRet = {
                "code": 200,
                "success": true,
                "retCode": '999999',
                "retMsg": "用户不存在"
            }
            res.send(errRet)
        }
        // 检查密码是否匹配
        if (password !== user.password) {
            const errRet = {
                "code": 200,
                "success": true,
                "retCode": '999999',
                "retMsg": "密码不匹配"
            }
            res.send(errRet)
        }
        // 用户信息写入session
        delete user.password
        req.session.user = user
        console.log(req.session)

        const ret = {
            "success": true,
            "code": 200,
            "message": "",
            "retCode": '000000',
            "data": user
        }
        res.status('200').json(ret)
    })
})

module.exports = router