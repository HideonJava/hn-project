import { login, logout, GetUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import md5 from 'md5'

const state = {
  token: getToken(),
  userId: '',
  name: '',
  avatar: '',
  department: '',
  introduction: '',
  roles: [],
  button: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_BUTTON: (state, button) => {
    state.button = button
  },
  SET_ID: (state, userId) => {
    state.userId = userId
  },
  SET_DEPART: (state, department) => {
    state.department = department
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    let { Mobile, PassWord } = userInfo
    PassWord = md5(PassWord).toUpperCase()
    return new Promise((resolve, reject) => {
      login({ Mobile: Mobile.trim(), PassWord: PassWord }).then(response => {
        const { Token, Name } = response
        commit('SET_TOKEN', Token)
        commit('SET_BUTTON', 'add')
        commit('SET_AVATAR', 'https://s1.videocc.net/live-admin-v3/4f87859c4d56d4cc38fbb5bdc337c30f.ico')
        commit('SET_INTRODUCTION', Name)
        setToken(Token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      GetUserInfo().then(res => {
        commit('SET_ROLES', 'admin')
        commit('SET_ID', res.ID)
        commit('SET_DEPART', res.DepartmentName)
        resolve(state)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_BUTTON', 'add')
      commit('SET_AVATAR', 'https://s1.videocc.net/live-admin-v3/4f87859c4d56d4cc38fbb5bdc337c30f.ico')
      commit('SET_INTRODUCTION', '测试嘿嘿')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
