/**
 * HTTP 适配器
 */
import defaultConfig from './config'
import http from './http'
import storage from '@/common/js/utils/storage';
import util from '@/common/js/utils/util';
import Constant, { staticData } from '@/Constant';

/**
 * 常规RESTfull接口调用
 *
 * @param      {String}    url               请求URL地址
 * @param      {Object}    data              请求数据,{}
 * @param      {Boolean}   showError         是否弹出错误提示,默认true
 * @param      {Boolean}   skipInterceptor   是否跳过拦截处理,默认false,若此项为true,则showError配置无效
 * @param      {Function}  success           请求成功回调
 * @param      {Function}  error             请求失败回调
 */
let httpCall = {
  get(url, data, showError = true, skipInterceptor = false, success = function() {}, error = function() {}) {
    //默认config覆写
    let axiosConfig = util.deepCopy(defaultConfig);
    axiosConfig.baseURL = Constant.apiBaseUrl;
    axiosConfig.headers.token = storage.local.get('token') || "";
    axiosConfig.skipInterceptor = skipInterceptor;
    axiosConfig.showError = showError;
    return http.get({ url, data }, axiosConfig, success, error);
  },

  post(url, data, showError = true, skipInterceptor = false, success = function() {}, error = function() {}) {
    //默认config覆写
    let axiosConfig = util.deepCopy(defaultConfig);
    axiosConfig.baseURL = Constant.apiBaseUrl;
    axiosConfig.headers.token = storage.local.get('token');
    axiosConfig.skipInterceptor = skipInterceptor;
    axiosConfig.showError = showError;

    return http.post({ url, data }, axiosConfig, success, error);
  },
}

export default httpCall;
