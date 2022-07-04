const USER_INFO = 'userInfo'
export default {
  saveUserInfo(data) {
    window.localStorage.setItem(USER_INFO, JSON.stringify(data))
  },
  readUserInfo() {
    return JSON.parse(window.localStorage.getItem(USER_INFO) || '')
  },
  removeUserInfo() {

  }
}
