import Qs from 'qs'
import Constant from '@/Constant'

export default {
  baseURL: Constant.apiBaseUrl,
  method: 'GET',
  transformRequest: [
    function(data) {
      //return Qs.stringify(data); //将data解析成URL QUERY SEARCH形式
      return JSON.stringify(data); //将data解析成JSON字符串形式
    }
  ],

  transformResponse: [
    function(data) {
      //解决IE浏览器9-11返回数据为string的异常情况
      if (typeof data === 'string') {
        return JSON.parse(data)
      } else {
        return data
      }
    }
  ],

  headers: {
    'Accept': 'application/json,text/html',
    'Content-Type': 'application/json;charset=UTF-8'
    //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },

  params: {},
  paramsSerializer: function(params) {
    return Qs.stringify(params)
  },

  timeout: 30000, //30秒
  withCredentials: false, // default
  responseType: 'json', // default

  //`onUploadProgress`允许处理上传过程的事件
  onUploadProgress: function(progressEvent) {
    // Do whatever you want with the native progress event
  },

  //`onDownloadProgress`允许处理下载过程的事件
  onDownloadProgress: function(progressEvent) {
    // Do whatever you want with the native progress event
  },

  maxContentLength: 100000,
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
  maxRedirects: 5, // default
}
