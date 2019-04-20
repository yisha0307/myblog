import {GET_USER_INFO, UPDATE_LOADING} from '../actions/constants'
const initialState = {
    userInfo: {},
    isLoading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        case UPDATE_LOADING: {
            return {
                ...state,
                isLoading: action.loading
            }
        }
        default:
            return state
    }
}


