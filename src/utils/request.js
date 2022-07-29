import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.ErrorCode !== 0) {
      Message({
        message: res.ErrorMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.ErrorCode === 400 || res.ErrorCode === 4001 || res.ErrorCode === 50014) {
        // to re-login
      }
      return Promise.reject(new Error(res.ErrorMsg || 'Error'))
    } else {
      return res.data
    }
  }, error => {
    MessageBox.confirm('token过期', 'Confirm logout', {
      confirmButtonText: '重新登录',
      type: 'warning'
    }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    })
    return Promise.reject(error)
  }
)

export default service
