module.exports = function (app) {
    app.use('/user', require('./user'))
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/post', require('./posts'))
    app.use('/comments', require('./comments'))
}