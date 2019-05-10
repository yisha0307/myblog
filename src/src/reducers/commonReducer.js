import {GET_USER_INFO, REFRESH_LOADING, CLEAR_USERINFO} from '../actions/constants'
const initialState = {
    userInfo: {},
    isLoading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case REFRESH_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case GET_USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        case CLEAR_USERINFO: {
            return {
                ...state,
                userInfo: {}
            }
        }
        default:
            return state
    }
}


