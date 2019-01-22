// 静态值定义： 【应用配置】
/**
 * [api 后端接口相关，自动根据打包命令加载对应环境接口地址]
 * @type {Object}
 */

// 环境配置 
export const env = {
  BASE_API: process.env.BASE_API,
  DYNAMIC_BASE_API: window.location.origin || (window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')),
  NODE_ENV: process.env.NODE_ENV, //环境模式
  PRINTING_DEBUG_LOG: true, //开启打印服务调试日志
  PRINT_DEBUG_URL: true, //开启HTTP请求URL (非生产境有效)
  STORE_LOG_SWITCH: true, //开启VUEX日志 (仅限开发环境有效)
  GLOBAL_LOADING_SWITCH: true, //开启全局Loading
  TASK_TIMER_SWITCH: true, //定时任务
  API_DYNAMIC_SWITCH: false, //开启动态系统API (hostIp || dynamicHostIp)
};

console.log('env-base_api >>>', env.BASE_API);

//切换浏览器请求IP
export let resolveHost = function() {
  if (env.NODE_ENV == 'development') {
    return env.BASE_API;
  }

  return env.API_DYNAMIC_SWITCH ? env.DYNAMIC_BASE_API : env.BASE_API;
};


//数据字典
export const staticData = {

};

//忽略登陆校验
export const ignoreLoginPage = ['/auth/login', '/auth/register', '/auth/forget', '/auth/noauth'];

//忽略授权验证
export const ignoreAuthPage = [];

//导出配置
export default {
  env: env,
  apiBaseUrl: resolveHost(), // 服务器API地址
  resourceBaseUrl: resolveHost(),
  imgBaseUrl: resolveHost() + "/image/", // 服务器图片地址 如： ... + '/image/图片路径'
  uploadBaseUrl: resolveHost() + "/upload", // 服务器上传API地址
  downloadBaseUrl: resolveHost() + "/dlid/", // 服务器下载API地址 如：... +'/dlid/'+item.fileId+'/1'+'?token=' + ?   (1-是否以原始文件名下载)
  downloadPathUrl: resolveHost() + "/dlfile/", //  + item.path
  staticData: staticData,
  ignoreLoginPage: ignoreLoginPage,
  ignoreAuthPage: ignoreAuthPage,
  errorMsg: {},
}
