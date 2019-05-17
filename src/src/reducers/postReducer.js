import {GET_POST_LIST, GET_POST_DETAIL, RENDER_RAW_POST} from '../actions/constants'
import { bindActionCreators } from 'redux';

const initialState = {
    posts: [],
    post: {},
    rawPost: {},
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
        case RENDER_RAW_POST: {
            return {
                ...state,
                rawPost: action.rawPost
            }
        }
        default:
            return state
    }
}