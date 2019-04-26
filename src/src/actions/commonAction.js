import ajax from '../tools/ajax'
import {GET_USER_INFO, REFRESH_LOADING} from './constants'

// actions
export function getUserInfo() {
    return dispatch => {
        ajax.get('/user/initData').then(res => {
            dispatch({
                type: GET_USER_INFO,
                userInfo: res.data.session || {}
            })
        })
    }
}

// export function login () {
//     return dispatch => {
//         ajax.post('/signin', {}).then(res => {
//             dispatch({
//                 type: LOGIN_SUCCESS
//             })
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