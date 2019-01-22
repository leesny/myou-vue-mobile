import axios from './axios'
import defaultConfig from './config'
import Router from 'vue-router'
import storage from "@/common/js/utils/storage"
import util from "@/common/js/utils/util"
import Constant from '@/Constant'

export default {
  /**
   * HTTP POST
   *
   * @param      {Object}       reqdata           请求对象
   *                {<String>}      reqdata.url       请求接口URL
   *                {<Object>}      reqdata.data      请求接口参数
   * @param      {Object}       config            axios配置项自定义
   * @param      {Functioin}    success           请求成功回调函数
   * @param      {Functioin}    error             请求失败回调函数
   * @return     {Promise}      promise           返回Promise对象，支持链式调用
   */
  post: function({ url, data }, config, success, error) {
    return this.request('POST', { url, data }, config, success, error)
  },

  /**
   * HTTP GET
   *
   * @param      {Object}       reqdata           请求对象
   *                {<String>}      reqdata.url      请求接口URL
   *                {<Object>}      reqdata.data     请求接口参数
   * @param      {Object}       config            axios配置项自定义
   * @param      {Functioin}    success           请求成功回调函数
   * @param      {Functioin}    error             请求失败回调函数
   * @return     {Promise}      promise           返回Promise对象，支持链式调用
   */
  get: function({ url, data }, config, success, error) {
    return this.request('GET', { url, data }, config, success, error);
  },

  /**
   * HTTP REQUEST
   *
   * param       {String}       method            请求方式：GET、POST ...
   * @param      {Object}       reqdata           请求对象
   *                {<String>}    reqdata.url        请求接口URL
   *                {<Object>}    reqdata.data       请求接口参数
   * @param      {Object}       config            axios配置项自定义
   * @param      {Functioin}    success           请求成功回调函数
   * @param      {Functioin}    error             请求失败回调函数
   * @return     {Promise}      promise           返回Promise对象，支持链式调用
   */
  request: function(method, { url, data }, config, success, error) {
    // 参数校验
    if (!util.checkParams({ url, data })) {
      return;
    }

    // 配置请求
    let axiosConfig = Object.assign({}, util.deepCopy(defaultConfig), config);
    axiosConfig.url = url;
    axiosConfig.method = method || 'post';
    if (axiosConfig.method.toLowerCase().trim() == "get") {
      //noCache：追加随机数，防止IE浏览器GET缓存
      axiosConfig.url = util.doURLNoCache(axiosConfig.url);

      //挂载数据
      data && (axiosConfig.params = data);
    } else {
      data && (axiosConfig.data = data);
    }

    // HTTP发送
    return axios.request(axiosConfig).then(res => {
      if (!res || res.status != 200 || !res.data) {
        error && error("请求服务异常！");
        return Promise.reject(new Error("请求服务异常！"));
      }

      let result = (typeof res.data) == 'string' ? JSON.parse(res.data) : res.data;
      if (result.code == 0) {
        success && success(result);
        return Promise.resolve(result)
      } else {
        error && error(result);
        return Promise.reject(result)
      }
    }).catch(err => {
      error && error(err.toString());
      if (util.isObject(err)) {
        return Promise.reject(err.message || '网络请求异常,请稍后再试!')
      } else {
        return Promise.reject(err)
      }
    })
  },

}
