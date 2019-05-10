import ajax from '../tools/ajax'
import {GET_USER_INFO, REFRESH_LOADING, LOGIN_SUCCESS, CLEAR_USERINFO} from './constants'

// actions
export function getUserInfo() {
    return dispatch => {
        ajax.get('/user/initData').then(res => {
            dispatch({
                type: GET_USER_INFO,
                userInfo: res.session || {}
            })
        })
    }
}

// export function login ({name, password}) {
//     return dispatch => {
//         ajax.post('/signin', {name, password: sha1(password)}).then(res => {

//         })
//     }
// }

export function load (bool) {
    return dispatch => {
        dispatch({
            type: REFRESH_LOADING,
            isLoading: bool
        })
    }
}

export function clearUserInfo () {
    return dispatch => {
        dispatch({
            type: CLEAR_USERINFO
        })
    }
}