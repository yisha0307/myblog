import {GET_POST_LIST, GET_POST_DETAIL} from '../actions/constants'

const initialState = {
    posts: [],
    post: {}
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
                post: action.postDetail
            }
        }
        default:
            return state
    }
}