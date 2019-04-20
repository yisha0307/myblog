import ajax from '../tools/ajax'
import {GET_POST_LIST} from './constants'
import _ from 'lodash'

const getPostList = () => {
    return async dispatch => {
        const result = await ajax.get('/post/all')
        const posts = _.get(result, 'data.data') || []
        dispatch({
            type: GET_POST_LIST,
            posts
        })
    }
}

export default {
    getPostList
}