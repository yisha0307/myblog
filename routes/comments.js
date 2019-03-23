const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/comment')
// POST /comments 创建一条留言
router.post('/', checkLogin, (req, res, next) => {
    const { postId, content } = req.fields
    const author = req.session.user._id
    console.log(postId, content, author)
    try {
        if (!content.length) {
            throw new Error('请填写留言内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }
    
    CommentModel.createComment({author, postId, content})
        .then(doc => {
            req.flash('success', '创建留言成功')
            res.redirect('back')
        })
        .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, (req, res, next) => {
    const commentId = req.params.commentId
    const author = req.session.user._id
    CommentModel.deleteCommentById(commentId).then(doc => {
        if (!doc) {
            throw new Error('留言不存在')
        }
        if (doc.author._id.toString() !== author.toString()) {
            throw new Error('没有权限删除留言')
        }
        req.flash('success', '删除留言成功')
        res.redirect('back')
    })
    .catch(next)
})

module.exports = router