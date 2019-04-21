import {GET_USER_INFO, UPDATE_LOADING, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS} from '../actions/constants'
const initialState = {
    userInfo: {},
    isLoading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return state
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }
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


