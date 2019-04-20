import {GET_USER_INFO} from '../actions/constants'
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
        default:
            return state
    }
}


