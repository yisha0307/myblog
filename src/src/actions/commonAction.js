import ajax from '../tools/ajax'
import {GET_USER_INFO, REFRESH_LOADING, LOGIN_SUCCESS, CLEAR_USERINFO} from './constants'
import sha1 from 'sha1'
import { message, Avatar } from 'antd';
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

export function signup ({name, password, repassword, avatar, gender, bio}) {
    console.log(name, password, repassword, avatar,bio, gender)
    const encryptedPwd = sha1(password)
    const encryptedRePwd = sha1(repassword)
    if (encryptedPwd !== encryptedRePwd) {
        message.info("密码两次输入不匹配，请重新输入")
        return
    }
    return async dispatch => {
        const result = await ajax.post('/user/signup', {name, password: encryptedPwd, avatar, gender, bio})
        console.log(result)
    }
}