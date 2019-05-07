import ajax from '../tools/ajax'
import sha1 from 'sha1'
import {GET_USER_INFO, REFRESH_LOADING, LOGIN_SUCCESS} from './constants'

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

export function login ({name, password}) {
    console.log('1', name, password)
    return dispatch => {
        ajax.post('/signin', {name, password: sha1(password)}).then(res => {
            dispatch({
                type: LOGIN_SUCCESS
            })
        })
    }
}

export function load (bool) {
    return dispatch => {
        dispatch({
            type: REFRESH_LOADING,
            isLoading: bool
        })
    }
}