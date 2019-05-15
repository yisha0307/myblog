import ajax from '../tools/ajax'
import {GET_POST_LIST, GET_POST_DETAIL} from './constants'
import _ from 'lodash'
import { message } from 'antd';

export const getPostList = authorId => {
    return async dispatch => {
        const result = await ajax.get('/post/all', {author: authorId})
        const posts = _.get(result, 'data') || []
        dispatch({
            type: GET_POST_LIST,
            posts
        })
    }
}

export const getPostDetail = id => {
    return async dispatch => {
        const result = await ajax.get(`/post/${id}`)
        const post = _.get(result, 'data.post') || {}
        const comments = _.get(result, 'data.comments') || []
        dispatch({
            type: GET_POST_DETAIL,
            postDetail: post || {},
            comments
        })
    }
}

export const createNewPost = ({title, content}) => {
    return async dispatch => {
        const result = await ajax.post(`/post/create`, {title, content})
        return new Promise((resolve, reject) => {
            if (result.retCode === '000000') {
                resolve(result)
            } else {
                reject(result)
            }
        })
    }
}

export const updatePost = (postId) => {

}

export const deletePost = (postId) => {
    return async dispatch => {
        const result = await ajax.get(`/post/remove/${postId}`)
        if (result.retCode === '000000') {
            message.success('删除文章成功')
            getPostList()
        } else {
            message.error(result.retMsg || '删除文章失败')
        }
    }
}

export const createComment = ({comment, postId}) => {
    return async dispatch => {
        const result = await ajax.post('/comments/create', {comment, postId})
        return new Promise((resolve, reject) => {
            if (result.retCode === '000000') {
                resolve(result)
            } else {
                reject(result)
            }
        })
    }
}

export const deleteComment = (commentId) => {
    return async dispatch => {
        const result = await ajax.get(`/comments/remove/${commentId}`)
        return new Promise((resolve, reject) => {
            if (result.retCode === '000000') {
                resolve(result)
            } else {
                reject(result)
            }
        })
    }
}