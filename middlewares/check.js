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
        if (req.session.user){
            // 用户已登录的话禁止访问登录、注册页面
            req.flash('error', '已登录')
            return res.redirect('back') // 返回之前的页面
        }
        next()
    }
}