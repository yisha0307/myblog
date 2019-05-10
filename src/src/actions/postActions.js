import ajax from '../tools/ajax'
import {GET_POST_LIST, GET_POST_DETAIL} from './constants'
import _ from 'lodash'

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
        const post = _.get(result, 'data') || {}
        dispatch({
            type: GET_POST_DETAIL,
            postDetail: post || {}
        })
    }
}

export const createNewPost = ({title, content}) => {
    return async dispatch => {
        const result = await ajax.post(`/post/create`, {title, content})
        console.log(result)
    }
}