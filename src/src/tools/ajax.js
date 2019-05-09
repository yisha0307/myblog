import axios from 'axios'
import * as commonActions from '../actions/commonAction'
import {message} from 'antd'
import store from '../store'

axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}

// 带cookie
axios.defaults.withCredentials = true

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
  message.info(err.retMsg || '网络有误, 请稍后再试')
})

const joinQueries = (obj = {}) => {
  const keys = Object.keys(obj)
  const queries = keys.map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&')
  return `?${queries}`
}

// 返回的直接是response.data
const get = (url, params) => {
  const restrUrl = params ? `${url}${joinQueries(params)}` : url
  return new Promise((resolve, reject) => {
    axios.get(restrUrl).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export default{
  get,
  post
}
