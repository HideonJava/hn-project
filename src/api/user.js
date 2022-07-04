import request from '@/utils/request'
import Qs from 'qs'

export function login(data) {
  return request({
    url: 'api/Login/UserLogin',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/api/Router/QuerySingleRouter',
    method: 'get',
    params: { token }
  })
}

export function querySingleRouter(data) {
  return request({
    url: '/api/Router/QuerySingleRouter',
    method: 'get',
    data
  })
}

export function updateUserRouter(data) {
  return request({
    url: '/api/Router/UpdateUserRouter',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getAllUser() {
  return request({
    url: '/api/User/GetAllUser',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function GetAllDepartment(data) {
  return request({
    url: 'api/User/GetAllDepartment',
    method: 'get',
    params: data
  })
}

export function GetUserInfo() {
  return request({
    url: 'api/User/GetUserInfo',
    method: 'get'
  })
}
