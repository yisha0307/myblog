const express = require('express')
const router = express.Router()

router.get('/initData', (req, res, next) => {
    let ret = {
        "success": true,
        "code": 200,
        "session": req.session.user || {}
    }
    res.send(ret)
})

module.exports = router