const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')

// GET /posts 所有用户或者特定用户的文章页
// eg: /posts?author=xxx
router.get('/', (req, res, next) => {
    res.render('posts')
})
// 发表文章页
router.get('/create', (req, res, next) => {
    res.render('create')
})
// POST /posts/create 发表一篇文章
router.post('/create', checkLogin, (req, res, next) => {
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content
    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }

    let post = {
        author,
        title,
        content
    }
    PostModel.create(post).then(function (result) {
        // 此post 是插入mongodb的值，包含_id
        post = result.ops[0]
        req.flash('success', '发表成功')
        res.redirect(`/posts/${post._id}`)
    }).catch(next)
})
// GET /posts/:postId 单独一篇文章页
router.get('/:postId', function (req, res, next) {
    res.send('文章详情页')
})
// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', function (req, res, next) {
    res.send('更新文章')
})
// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
    res.send('更新文章')
})
// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
    res.send('删除文章')
})

module.exports = router