import axios from 'axios'
import * as commonActions from '../actions/commonAction'
// import {message} from 'antd'
import store from '../store'

axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}

// 带cookie
// axios.defaults.withCredentials = true

// 定义一个请求拦截器，完成发请求时候的loading效果
axios.interceptors.request.use(function (config) {
  store.dispatch(commonActions.load(true))
  return config
})
// 定义一个响应拦截器
axios.interceptors.response.use(function (config) {
  store.dispatch(commonActions.load(false))
  return config
}, err => {
  store.dispatch(commonActions.load(false))
  // message.info(err.retMsg || '网络有误, 请稍后再试')
})

const joinQueries = (obj = {}) => {
  const keys = Object.keys(obj)
  const queries = keys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&')
  return `?${queries}`
}

const get = (url, params) => {
  if (!params) {
    return axios.get(url)
  }
  return axios.get(`${url}${joinQueries(params)}`)
}
export default{
  get,
  post: (url, params) => axios.post(url, params)
}
