import {GET_POST_LIST, GET_POST_DETAIL} from '../actions/constants'
import { bindActionCreators } from 'redux';

const initialState = {
    posts: [],
    post: {},
    comments: [],
    newTitle: '',
    newContent: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POST_LIST: {
            console.log(action)
            return {
                ...state,
                posts: action.posts
            }
        }
        case GET_POST_DETAIL: {
            return {
                ...state,
                post: action.postDetail,
                comments: action.comments
            }
        }
        default:
            return state
    }
}