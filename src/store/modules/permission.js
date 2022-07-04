import { asyncRoutes, constantRoutes } from '@/router'
import { querySingleRouter } from '@/api/user'
import Layout from '@/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes (resolve: any) => require([`@/views/${view}.vue`], resolve)
 */
 export function generaMenu(routes, data) {
  data.forEach(item => {
    // alert(JSON.stringify(item))
    const menu = {
      path: item.Path === '#' ? item.id + '_key' : item.Path,
      // component: item.component === '#' ? Layout : () => import(`@/views${item.component}`),
      component: item.Path === '#' ? Layout : (resolve) => require([`@/views${item.Path}/index`], resolve),
      hidden: item.hidden,
      // redirect: item.redirect,
      children: [],
      name: item.Name,
      // meta: item.meta
      meta: { title: item.Name, id: item.ID, icon: item.Icon ,roles: ['admin'] }
    }

    if (item.Chirldren) {
      generaMenu(menu.children, item.Chirldren)
    }
    routes.push(menu)
  })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      querySingleRouter().then(res => {
          console.log(res);
          Object.assign(loadMenuData, res)
          const tempAsyncRoutes = Object.assign([], asyncRoutes)
          // tempAsyncRoutes = asyncRoutes
          generaMenu(tempAsyncRoutes, loadMenuData)
          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = tempAsyncRoutes || []
          } else {
            accessedRoutes = filterAsyncRoutes(tempAsyncRoutes, roles)
          }
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        // generaMenu(asyncRoutes, data)
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
