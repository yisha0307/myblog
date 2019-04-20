import {GET_POST_LIST} from '../actions/constants'

const initialState = {
    posts: []
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
        default:
            return state
    }
}