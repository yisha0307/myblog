const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const Post = require('../lib/mongodb').Post
const CommentModel = require('../models/comment')
const PostModel = require('../models/post')

// GET /post 所有用户或者特定用户的文章页
// eg: /post?author=xxx
router.get('/all', async (req, res, next) => {
    let ret = {
        "success": true,
        "code": 200,
        "message": "",
        "data": []
    }
    const query = {}
    const author = req.query.author
    if (author) {
        query.author = author
    }
    const data = await Post.find(query).sort({_id: -1}).populate('author')
    ret.data = data
    res.send(ret)
})

// POST /post/create 发表一篇文章
router.post('/create', (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const author = req.session.user._id
    let ret = {
        "retCode": '000000',
        "postId": ""
    }
    let errRet = {
        "retCode": '999999',
        "retMsg": ""
    }
    // 校验参数
    try {
        if (!title.length) {
            res.send({...errRet, "retMsg": '请填写标题'})
        }
        if (!content.length) {
            res.send({...errRet, "retMsg": '请填写内容'})
        }
    } catch (e) {
        res.send({...errRet, "retMsg": '网络错误'})
    }
    // todo 加author
    let postEntity = new Post({title, content, author})
    postEntity.save((err, doc) => {
        if (err) {
            console.log('err---->', err)
            errRet.errMsg = err
            res.send(errRet)
        } else {
            ret.postId = doc._id
            console.log(ret)
            res.send(ret)
        }
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
    let post = await PostModel.findPostById(postId)
    const comments = await CommentModel.getComments(postId)
    await PostModel.incPV(postId)
    post.commentsCount = comments.length || 0
    if (!post) {
        ret = {
            "success": false,
            "message": '该文章不存在'
        }
    } else {
        ret.data = {
            post,
            comments
        }
    }
    res.send(ret)
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
// GET /post/remove/:postId 删除一篇文章
router.get('/remove/:postId', function (req, res, next) {
    const postId = req.params.postId
    const author = req.session.user._id
    
    PostModel.deletePostById(postId).then(post =>{
        if (!post) {
            res.send({
                "retCode": '999999',
                "retMsg": '没有找到该文章'
            })
        }
        if (author !== post.author._id.toString()) {
            res.send({
                "retCode": '999999',
                "retMsg": '没有权限'
            })
        }
        CommentModel.deleteCommentsByPostId(postId)
        const ret = {
            'retCode': '000000'
        }
        res.send(ret)
    }).catch(next)
})

module.exports = router