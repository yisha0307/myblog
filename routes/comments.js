const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comment')
// POST /comments 创建一条留言
router.post('/create', (req, res, next) => {
    const {comment, postId} = req.fields
    const author = req.session.user._id
    try {
        if (!comment.length) {
            throw new Error('请填写留言内容')
        }
    } catch (e) {
        return e
    }
    CommentModel.createComment({author, postId, content: comment})
        .then(doc => {
            const ret = {
                success: 'true',
                retCode: '000000'
            }
            res.send(ret)
        })
        .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/remove/:commentId', (req, res, next) => {
    const commentId = req.params.commentId
    const author = req.session.user._id
    const ret = {
        retMsg: '',
        retCode: ''
    }
    CommentModel.deleteCommentById(commentId).then(doc => {
        if (!doc) {
            ret.retCode = '999999'
            ret.retMsg = '留言不存在'
        }
        if (doc.author._id.toString() !== author.toString()) {
            ret.retCode = '999999'
            ret.retMsg = '没有权限删除留言'
        }
        ret.retCode = '000000'
        res.send(ret)
    })
    .catch(next)
})

module.exports = router