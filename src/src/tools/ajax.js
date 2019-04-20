import axios from 'axios'

const joinQueries = (obj = {}) => {
    const keys = Object.keys(obj)
    const queries = keys.map(k => `${k}=${obj[k]}`).join('&')
    return `?${queries}`
}
const get = (url, params) => axios.get(url + '' + joinQueries(params))

const post = (url, params) => axios.post(url, params)

// // 请求的地方设置成true
// axios.interceptors.request.use(function () {
//     store.isLoading = true
// })
// // 响应的地方设置成false
// axios.interceptors.response.use(function () {
//     store.isLoading = false
// })
export default {
    get,
    post
}