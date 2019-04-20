import axios from 'axios'

const joinQueries = (obj = {}) => {
    const keys = Object.keys(obj)
    const queries = keys.map(k => `${k}=${obj[k]}`).join('&')
    return `?${queries}`
}
const get = (url, params) => axios.get(url + '' + joinQueries(params))

const post = (url, params) => axios.post(url, params)

export default {
    get,
    post
}