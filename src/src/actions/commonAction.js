import ajax from '../tools/ajax'
import {GET_USER_INFO} from './constants'

// actions
function getUserInfo() {
    return dispatch => {
        ajax.get('/user/initData').then(res => {
            dispatch({
                type: GET_USER_INFO,
                userInfo: res.data.session || {}
            })
        })
    }
}

export default {
    getUserInfo
}