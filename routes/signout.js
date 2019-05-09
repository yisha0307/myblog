const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', (req, res, next) => {
    // 清空sesson中的用户信息
    req.session.user = null
    const ret = {
        "code": 200,
        "success": true,
        "retCode": "000000"
    }
    res.send(ret)
})

module.exports = router