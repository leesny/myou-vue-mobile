import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
import util from '@/common/js/utils/util'
import msg from '@/common/js/comp/msg'

let context = {
  skipInterceptor: false, //是否跳过拦截统一处理
  showError: true //是否采用统一错误提示 
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }

    //是否跳过拦截处理
    if (config.skipInterceptor != undefined) {
      context.skipInterceptor = Boolean(config.skipInterceptor);
    } else {
      context.skipInterceptor = false;
    }

    //是否错误统一提示
    if (config.showError != undefined) {
      context.showError = Boolean(config.showError);
    } else {
      context.showError = true;
    }

    delete config.showError;
    delete config.skipInterceptor;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (data && data.hasOwnProperty('code') && data.code == 0) {
      //更改连接状态，启动定时任务
      store.dispatch('updateAccessed', true);
      return response;
    } else {
      //关闭loading
      store.dispatch('showLoading', false);
      return _doBusinessError(response);
    }
  },
  error => {
    //关闭loading
    store.dispatch('showLoading', false);
    if (context.skipInterceptor) {
      return Promise.reject(error);
    }

    if (error && error.response) {
      _doInterfaceError(error)
    }

    if (error && (error.toString().indexOf('Network') > 0 || error.toString().indexOf('timeout of') > 0)) {
      error = '网络请求异常！'
    }

    let message = error;
    if (util.isObject(error)) {
      message = error.message;
    }

    context.showError && msg.error(message || "请求出错了");
    return Promise.reject(error)
  }
)

// 处理接口业务逻辑 
/** 
 * -1 未知错误
 *  1 token失效  
 *  2 没有权限
 *  3 记录重复
 */
let _doBusinessError = function(response) {
  let reqConfig = response.config;
  let code = response.data.code;
  let errMsg = response.data.message || "请求出错了";

  //跳过拦截处理
  if (context.skipInterceptor) {
    if (code == 1) {
      store.dispatch('updateAccessed', false);
    }

    return Promise.reject(response);
  }


  //业务错误处理
  switch (code) {
    case 1:
      //更改连接状态，停止定时任务
      store.dispatch('updateAccessed', false);

      if (context.showError) {
        window.SWAPP.msg.confirm("哎呦……", "您登录已失效，请重新登录！", "warning", function() {
          store.dispatch('logoutClient').then(() => {
            //回到登录页
            router.replace({
              path: '/auth/login',
              query: { redirect: router.currentRoute.fullPath }
            })
          });
        }, {
          showCancelButton: false,
        })
      } else {
        router.replace({
          path: '/auth/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      }
      break;
    case 2:
      context.showError && msg.error(errMsg);

      //跳转到未授权提示页面
      router.replace({
        path: '/auth/noauth'
      })
      break;
    case -1:
    case 3:
      context.showError && msg.error(errMsg);
      break;
    default:
      context.showError && msg.error(errMsg);
      break;
  }

  return Promise.reject(errMsg);
}

// 处理接口网络层错误
let _doInterfaceError = function(error) {
  switch (error.response.status) {
    case 400:
      error.message = '请求错误'
      break;
    case 401:
      store.dispatch('logoutClient').then(() => {
        router.replace({
          path: '/auth/login',
          query: { redirect: router.currentRoute.fullPath }
        })
      });
      break;
    case 403:
      error.message = '拒绝访问'
      break;
    case 404:
      error.message = `请求地址出错: ${error.response.config.url}`
      break;
    case 408:
      error.message = '请求超时'
      break;
    case 500:
      error.message = '服务器内部错误'
      break;
    case 501:
      error.message = '服务未实现'
      break;
    case 502:
      error.message = '网关错误'
      break;
    case 503:
      error.message = '服务不可用'
      break;
    case 504:
      error.message = '网关超时'
      break;
    case 505:
      error.message = 'HTTP版本不受支持'
      break;
    default:
      break;
  }
};

export default axios
