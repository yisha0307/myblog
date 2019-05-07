// 权限控制
module.exports = {
    checkLogin: function checkLogin (req,res,next) {
        if (!req.session.user){
            req.flash('error', '未登录')
            return res.redirect('/signup')
        }
        next()
    },
    checkNotLogin: function checkNotLogin (req, res, next) {
        console.log('------', req.session)
        if (req.session.user){
            const ret = {
                "success": true,
                "code": 200,
                "message": "已登录",
                "data": {
                    "errMsg": "已登录"
                }
            }
            return res.send(ret)
        }
        next()
    }
}