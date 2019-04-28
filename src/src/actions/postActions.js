import ajax from '../tools/ajax'
import {GET_POST_LIST, GET_POST_DETAIL} from './constants'
import _ from 'lodash'

export const getPostList = () => {
    return async dispatch => {
        const result = await ajax.get('/post/all')
        const posts = _.get(result, 'data.data') || []
        dispatch({
            type: GET_POST_LIST,
            posts
        })
    }
}

export const getPostDetail = id => {
    return async dispatch => {
        const result = await ajax.get(`/post/${id}`)
        const post = _.get(result, 'data.data') || {}
        dispatch({
            type: GET_POST_DETAIL,
            postDetail: post || {}
        })
    }
}