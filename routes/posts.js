const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const Post = require('../lib/mongodb').Post
const CommentModel = require('../models/comment')
const PostModel = require('../models/post')

// GET /post/all 所有用户或者特定用户的文章页
// eg: /post?author=xxx
router.get('/all', async (req, res, next) => {
    let ret = {
        "retCode": "000000",
        "message": "",
        "data": []
    }
    const query = {}
    const author = req.query.author
    if (author) {
        query.author = author
    }
    let posts = await Post.find(query).sort({_id: -1}).populate('author')
    Promise.all(posts.map(post => CommentModel.getCommentsCount(post._id))).then(result => {
        ret.data = posts.map((p, i) => ({
            author: p.author,
            content: p.content,
            title: p.title,
            _v: p._v,
            _id: p._id,
            pv: p.pv,
            commentsCount: result[i]
        }))
        res.send(ret)
    })
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

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch (e) {
        res.send({"retCode": "999999", "retMsg": e.message || '网络错误'})
    }
    // todo 加author
    let postEntity = new Post({title, content, author})
    postEntity.save((err, doc) => {
        if (err) {
            errRet.errMsg = err
            res.send({"retCode": "999999", "retMsg": err.message || '网络错误'})
        } else {
            ret.postId = doc._id
            res.send(ret)
        }
    })
})
// GET /posts/:postId 单独一篇文章页
router.get('/:postId', async (req, res, next) => {
    let ret = {
        "retCode": "000000",
        "retMsg": "",
        "data": {}
    }
    const postId = req.params.postId
    let post = await PostModel.findPostById(postId)
    const comments = await CommentModel.getComments(postId)
    await PostModel.incPV(postId)
    post.commentsCount = comments.length || 0
    if (!post) {
        ret = {
            "retCode": '999999',
            "retMsg": '该文章不存在'
        }
    } else {
        ret.data = {
            post,
            comments
        }
    }
    res.send(ret)
})
// GET /post/raw/:postId 更新文章页
router.get('/raw/:postId', function (req, res, next) {
    const postId = req.params.postId
    const author = req.session.user._id

    PostModel.getRawPostById(postId).then(post => {
        if (!post) {
            const ret = {
                retCode: '999999',
                retMsg: '该文章不存在'
            }
            res.send(ret)
        } else if (author.toString() !== post.author._id.toString()) {
            const ret = {
                retCode: '999999',
                retMsg: '权限不足'
            }
            res.send(ret)
        } else {
            const ret = {
                retCode: '000000',
                data: post
            }
            res.send(ret)
        }
    })
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

router.post('/update/:postId', function (req, res, next) {
    const postId = req.params.postId
    const title = req.body.title
    const content = req.body.content
    const author = req.session.user._id

    try {
        if (!title.length) {
            throw new Error('请填写标题')
        }
        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch (e) {
        const ret = {
            retCode: '999999',
            retMsg: e.message || '更新失败'
        }
        return res.send(ret)
    }

    PostModel.updatePostById(postId, {title, content}).then(post => {
        try {
            if (!post) {
                throw new Error('文章不存在')
            }
            if (post.author._id.toString() !== author.toString()) {
                throw new Error('没有权限')
            }
        } catch (e) {
            const ret = { 
                retCode: '999999',
                retMsg: e.message || '更新失败'
            }  
            return res.send(ret)
        }
        const ret = {
            retCode: '000000',
            retMsg: '更新成功',
            data: post._id
        }
        return res.send(ret)
    })
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