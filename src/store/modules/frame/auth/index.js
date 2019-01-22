import * as types from '@/store/mutation-types';
import httpCall from '@/common/js/http/httpAdapter';
import util from '@/common/js/utils/util';

import { getCurrRoute, isNotNeedLoginPage, checkCurrPageAuthed } from '@/interceptor/index';

export default {
  namespaced:true,
  state: {
    // 登录相关
    token: null,
    isLogend: false,
    userInfo: {},
    authMenus: [],
    accessed: true
  },

  actions: {
    // 登录相关
    login({ commit }, { loginCode, loginPwd, clientType }) {
      return httpCall.post("/sm/login", { loginCode, loginPwd, clientType }).then((res) => {
        let token = res.data.token;
        commit(types.LOGIN_TOKEN, token);
        commit(types.IS_LOGEND, Boolean(token));
      })
    },

    /**
     * 检查登录- isServer为true，则校验服务端session，否则仅校验浏览器端用户数据
     */
    checkLogined({ commit, state }, isServer = false) {
      let token = util.storage.local.get('token');
      let isLogend = util.storage.local.get('isLogend');
      let userInfo = util.storage.local.get('userInfo');

      //检查本地
      let clientLogined = Boolean(token && isLogend && userInfo);
      if (!isServer) {
        return clientLogined;
      }

      //检查Server
      return httpCall.get('/sm/checkLogin').then(res => {
        let logined = res.data;
        return logined;
      });
    },

    logoutClient({ commit }) {
      commit(types.CLEAER_DIRTY_DATA);
    },

    logoutServer({ commit }, showError = false) {
      return httpCall.post("/sm/logout", null, showError).then((res) => {
        commit(types.CLEAER_DIRTY_DATA);
      })
    },

    updateAccessed({ commit }, status) {
      commit(types.UPDATE_ACCESSED, status)
    },

    getCurrUser({ commit }) {
      return httpCall.get("/sm/user/getCurrUser").then((res) => {
        let user = res.data;
        commit(types.USER_INFO, user);
        return user;
      })
    },

    getAuthMenuData({ commit }) {
      return httpCall.get("/sm/menu/nav").then((res) => {
        let menuData = res.data;
        commit(types.AUTH_MENU_DATA, menuData);
        return menuData;
      })
    },

    removeUserInfo({ commit }) {
      commit(types.DELETE_USER_INFO);
    }
    // 注册相关
  },

  mutations: {
    [types.CLEAER_DIRTY_DATA]() {
      //登陆记住账号状态以外的缓存数据，全部清除掉
      let rememberStatus = util.storage.local.get('rememberStatus');
      let loginCode = util.storage.local.get('loginCode');
      util.storage.local.removeAll();

      //重设记住账号
      util.storage.local.set('rememberStatus', rememberStatus);
      if (rememberStatus === 'accepted') {
        util.storage.local.set('loginCode', loginCode);
      }
    },
    [types.LOGIN_TOKEN](state, token) {
      util.storage.local.set('token', token);
      state.token = token;
    },

    [types.IS_LOGEND](state, logined) {
      util.storage.local.set('isLogend', logined);
      state.isLogend = logined;
    },

    [types.UPDATE_ACCESSED](state, status) {
      util.storage.local.set('accessed', status);
      state.accessed = status;
    },

    [types.USER_INFO](state, user) {
      let oldUser = util.storage.local.get('userInfo')
      // 登陆用户ID更改，可能是同一浏览器打开多个选项卡造成数据混乱。
      // 写入变量mutipleUserId，window监听storage写入，判断是否刷新页面保持选项卡用户信息同步。
      if (oldUser && oldUser.hasOwnProperty('userId') && user && user.hasOwnProperty('userId') && oldUser.userId !== user.userId) {
        util.storage.local.set('multipleUserId', user.userId)
      }

      util.storage.local.set('userInfo', user)
      state.userInfo = user
    },

    [types.AUTH_MENU_DATA] (state, authMenus) {
      util.storage.local.set('authMenus', authMenus)

      // Tree转换成List
      if (authMenus && authMenus.menus) {
        let menuList = []
        util.transAuthMenus(authMenus.menus, menuList)
        util.storage.local.set('authMenuList', menuList)
      }

      state.authMenus = authMenus
    },

    [types.WATCH_LOGIN_USER](state) {

      /**
       * 监听storage改变
       */
      window.addEventListener("storage", function(e) {
        // 监听以下storage存取
        let prefix = util.storage.getPrefix();
        let listenerKeys = [prefix + 'rememberStatus', prefix + 'loginCode', prefix + 'isLogend', prefix + 'userInfo', prefix + 'authMenuList']
        if (!listenerKeys.includes(e.key)) {
          return
        }

        // 获取当前路由
        let currRoute = getCurrRoute()

        // 无需登陆页面不用刷新
        let ignoreLoginPage = isNotNeedLoginPage(currRoute)
        if (ignoreLoginPage) {
          return
        }

        // 用户登陆信息已经变更
        let userInfo = util.storage.local.get('userInfo')
        let authMenus = util.storage.local.get('authMenuList')

        // 检查当前页是否有权限
        if (!userInfo) {
          if (checkCurrPageAuthed(currRoute)) {
            window.location.reload();
          } else {
            window.location.href = '/'
          }
          return
        }

        let multipleUserId = util.storage.local.get('multipleUserId')
        if (multipleUserId && authMenus) {
          // 移除缓存，防止重复刷新
          if (e.key == prefix + 'authMenuList') {
            util.storage.local.remove('multipleUserId')
          }

          if (checkCurrPageAuthed(currRoute)) {
            window.location.reload();
          } else {
            window.location.href = '/';
          }
        }
      }, false);
    }
  },

  getters: {
    token: state => {
      let token = state.token;
      if (token) {
        return token
      }

      return util.storage.local.get('token')
    },

    isLogend: state => {
      let isLogend = state.isLogend
      if (isLogend) {
        return isLogend
      }

      return util.storage.local.get('isLogend')
    },

    accessed: state => {
      let accessed = state.accessed
      if (accessed) {
        return accessed
      }

      return util.storage.local.get('accessed')
    },

    userInfo: state => {
      let userInfo = state.userInfo
      if (userInfo && userInfo.hasOwnProperty('userId')) {
        return userInfo
      }

      return util.storage.local.get('userInfo')
    },

    authMenus: state => {
      let authMenus = state.authMenus
      if (authMenus && authMenus.length > 0) {
        return authMenus
      }

      return util.storage.local.get('authMenus')
    }
  }
}
