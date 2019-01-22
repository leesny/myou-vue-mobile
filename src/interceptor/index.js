import Vue from 'vue';
import Router from 'vue-router';
import Constant from '@/Constant';
import util from '@/common/js/utils/util';
import store from '@/store/index';
import RouterConfig from '@/router/index';

//处理页面路由
export const resolveRoute = function(route) {
  route = route.startsWith('#') ? route.substring(1) : route;
  route = route.includes("?") ? route.substring(0, route.indexOf('?')) : route;
  return route;
}

//获取当前页路由
export const getCurrRoute = function(to) {
  //当前激活路由
  let currRoute = to || RouterConfig.match(window.location).hash;
  currRoute = resolveRoute(currRoute);
  return currRoute;
}

//检查是否无需登录
export const isNotNeedLoginPage = function(to) {
  let route = to || getCurrRoute();
  route = resolveRoute(route);

  let noAuthPage = Constant.ignoreLoginPage.find(item => {
    return route.toLowerCase() == item.toLowerCase();
  });

  return Boolean(noAuthPage);
}

//检查是否忽略权限
export const isIgnoreAuthPage = function(to) {
  let route = to || getCurrRoute();
  route = resolveRoute(route);

  let ignoreAuthPage = Constant.ignoreAuthPage.find(item => {
    return route.toLowerCase().includes(item.toLowerCase());
  });

  return Boolean(ignoreAuthPage);
}

//检查当前页是否有权限
export const checkCurrPageAuthed = function(to) {
  let route = to || getCurrRoute();
  route = resolveRoute(route);

  let authMenus = util.storage.local.get('authMenuList');

  //如果缓存没有authMenuList，可能页面尚未加载完毕，此时省去校验（兼容登陆失效时跳回上一页的情况）。
  if (!authMenus && util.storage.local.get('invalidRelogined')) {
    console.log('您登陆失效重新登陆啦，无需校验页面权限，直接返回上一页');
    return true;
  }

  let hasAuthMenu = authMenus && authMenus.find(item => {
    item.menuUrl = item.menuUrl || '';
    let menuRoute = item.menuUrl.startsWith('#') ? item.menuUrl.substring(1) : item.menuUrl;
    menuRoute = menuRoute.includes("?") ? menuRoute.substring(0, menuRoute.indexOf('?')) : menuRoute;
    return route.toLowerCase() == menuRoute.toLowerCase();
  });

  console.log('菜单在权限菜单中查找 >>>', hasAuthMenu);
  let ignoreAuthPage = isIgnoreAuthPage(route);

  console.log('菜单是否忽略权限检查 >>>', ignoreAuthPage);
  return Boolean(hasAuthMenu) || Boolean(ignoreAuthPage);
}

//检查当前操作是否有权限
export const checkCurrActionAuthed = function(permissionCode) {
  let authMenus =  util.storage.local.get('authMenus') || {};
  let authPermiss = authMenus.permissions || [];
  let hasAuthMenu = authPermiss && authPermiss.find(item => {
    return permissionCode.toLowerCase() == item.toLowerCase();
  });

  return Boolean(hasAuthMenu);
}

//路由拦截器
export const routerInterceptor = function(router) {
  if (!router || !(router instanceof Router)) {
    console.error('路由拦截设置失败：传入的router无效！');
    return;
  }

  router.beforeEach((to, from, next) => {
    console.log('跳转至：' + to.fullPath + ' ,是否要求登录： ' + Boolean(!(to.meta.ignoreAuth)));

    //重写Redirect路径,避免登录成功再重定向回登录页
    if (to.query && to.query.redirect == '/auth/login') {
      to.query.redirect = "/";
    }

    if (!to.meta || !to.meta.ignoreAuth) {
      let checkRemote = to.meta.checkRemote;
      let targetPath = to.fullPath;

      store.dispatch('checkLogined', checkRemote).then(logined => {
        let query = Object.assign({}, to.query, {
          redirect: targetPath
        });

        if (logined) {
          //完整路径
          if (to.fullPath.includes('http')) {
            location.href = to.fullPath.startsWith("/") ? to.fullPath.substring(1) : to.fullPath;
          } else {
            //访问路径是否已配置授权
            if (checkCurrPageAuthed(to.fullPath)) {
              next();
            } else {
              next({
                path: '/auth/noauth'
              });
            }
          }
        } else {
          next({
            path: '/auth/login',
            query: query
          });
        }
      });
    } else {
      next();
    }
  })
};
