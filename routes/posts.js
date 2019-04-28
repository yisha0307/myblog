const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const Post = require('../lib/mongodb').Post
const CommentModel = require('../models/comment')
const PostModel = require('../models/post')

// GET /posts 所有用户或者特定用户的文章页
// eg: /posts?author=xxx
router.get('/all', async (req, res, next) => {
    let ret = {
        "success": true,
        "code": 200,
        "message": "",
        "data": []
    }
    const data = await Post.find()
    ret.data = data
    res.send(ret)
})

router.get('/', (req, res, next) => {
    const author = req.query.author

    PostModel.findPosts(author)
    .then(docs => {
        Promise.all(docs.map(doc => CommentModel.getCommentsCount(doc._id)))
            .then(results => {
                for (let i =0; i < docs.length; i++) {
                    docs[i].commentsCount = results[i]
                }
                res.render('posts', {posts: docs})
            })
    })
    .catch(next)
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
    // 发表文章 promise
    PostModel.add(post).then(doc => {
        let post = doc
        req.flash('success', '发表成功')
        res.redirect(`/posts/${post._id}`)
    }).catch(err => {
        next(err)
    })
})
// GET /posts/:postId 单独一篇文章页
router.get('/:postId', async (req, res, next) => {
    let ret = {
        "success": true,
        "code": 200,
        "message": "",
        "data": {}
    }
    const postId = req.params.postId
    const post = await Post.findOne({_id: postId})
    if (!post) {
        ret = {
            "success": false,
            "message": '该文章不存在'
        }
    } else {
        ret.data = post
    }
    res.send(ret)
    // Promise.all([
    //     PostModel.findPostById(postId), 
    //     CommentModel.getComments(postId),
    //     PostModel.incPV(postId)])
    //     .then(([post, comments, re]) => {
    //         if (!post) {
    //             throw new Error('该文章不存在')
    //         }
    //         post.commentsCount = comments.length || 0
    //         res.render('post', {post, comments})
    //     })
    //     .catch(e => {
    //         req.flash('error', e.message)
    //         return res.redirect('back')
    //     })
})
// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', function (req, res, next) {
    const postId = req.params.postId
    const author = req.session.user._id

    PostModel.getRawPostById(postId).then(post => {
        if (!post) {
            throw new Error('该文章不存在')
        }
        if (author.toString() !== post.author._id.toString()) {
            throw new Error('权限不足')
        }
        res.render('edit', {post})
    })
    .catch(e=>next(e))
})
// POST 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next){
    const postId = req.params.postId
    const title = req.fields.title
    const content = req.fields.content
    const author = req.session.user._id

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

    PostModel.updatePostById(postId, {title, content}).then(post => {
        if (!post) {
            throw new Error('文章不存在')
        }
        if (post.author._id.toString() !== author.toString()) {
            throw new Error('没有权限')
        }
        req.flash('success', '编辑文章成功')
        res.redirect(`/posts/${postId}`)
    }).catch(next)
})
// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
    const postId = req.params.postId
    const author = req.session.user._id

    PostModel.deletePostById(postId).then(post =>{
        if (!post) {
            throw new Error('文章不存在')
        }
        if (author !== post.author._id.toString()) {
            throw new Error('没有权限')
        }
        CommentModel.deleteCommentsByPostId(postId)
        req.flash('success', '删除文章成功')
        res.redirect('/posts')
    }).catch(next)
})

module.exports = router