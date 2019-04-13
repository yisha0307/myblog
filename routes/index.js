module.exports = function (app) {
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/post', require('./posts'))
    app.use('/comments', require('./comments'))
    // app.use(function(req, res){
    //     if (!res.headerSent) {
    //         res.status(404).render('404')
    //     }
    // })
    // app.use(function(err, req, res, next){
    //     console.error(err)
    //     req.flash('error', err.message)
    //     res.redirect('/')
    // })
}