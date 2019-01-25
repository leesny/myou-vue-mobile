import Crypto from "crypto-js";
import Constant from "@/Constant"
import storage from "./storage"
import router from '@/router/index'
import store from '@/store/index'
import { checkCurrActionAuthed } from '@/interceptor/index';

export const util = {
  //本地存储
  storage: storage,

  MD5: function(data) {
    return data;
  },
  replaceAll: function(str, match, ment) {
    while (true) {
      let pos = str.indexOf(match);
      if (pos >= 0) {
        str = str.replace(match, ment);
      } else {
        break;
      }
    }
    return str;
  },

  doSign: function(data) {
    let sign = "";
    for (let p of data) {
      sign += `${p}=${data[p]}&`;
    }
    /*eslint-disable no-useless-escape */
    sign = sign.replace(/\&$/g, "").split("&").filter((item, index) => /^p\d\=/g.test(item)).join("&");

    sign += storage.local.get('signKey') || "";
    sign = Crypto.enc.Utf8.parse(sign);
    sign = Crypto.MD5(sign, { asBytes: true });
    sign = Crypto.enc.Hex.stringify(sign);
    return sign;
  },
  format: function(timeSpan, fmt){
    return fmt;
  },
  
  //检查请求参数
  checkParams: function({ url, param }) {
    if (!url || !url.length) {
      console.error("请求方法(fn)必须传入！");
      return false;
    }

    /*if (!Array.isArray(param)) {
      console.error("请求参数(param)必须是数组！");
      return false;
    }*/

    return true;
  },

  //组合httpURL
  combHttpURL: function(baseURL, data) {
    let httpURL = baseURL.toString();
    if (!httpURL.includes("?")) {
      httpURL += "?"
    }

    for (let key of Object.keys(data)) {
      httpURL += (key + "=" + data[key]) + "&";
    }

    //没有内容
    if (httpURL.endsWith("?")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }

    if (httpURL.endsWith("&")) {
      httpURL = httpURL.substring(0, httpURL.length - 1);
    }

    return httpURL;
  },

  resolveHttpUrl: function(url) {
    return url.substr(0, 7).toLowerCase() == "http://" ? url : "http://" + url;
  },

  //文件路径处理 (传入PATH)
  renderFilePath(path) {
    if (!path) return 'static/img/avatars/8.jpg';
    if (path.indexOf('http') == -1) {
      path = `${Constant.downloadPathUrl}${path}`;
    }

    if (path.indexOf('token=') != -1) {
      return path;
    }

    let split = path.includes('?') ? '&' : '?';
    let token = storage.local.get('token');
    return `${path}${split}token=${token}`
  },

  //文件路径处理 (传入FILEID)
  renderFilePathByFileId(fileId) {
    if (!fileId) return '';
    let token = storage.local.get('token');
    return `${Constant.downloadBaseUrl}${fileId}/1?token=${token}`;
  },

  doURLNoCache: function(url) {
    let prefix = url.includes('?') ? '&' : '?';
    return url + prefix + '_t=' + new Date().getTime();
  },

  //input自动获取焦点
  autoFocus: function(ref, isFocus, isSelect) {
    if (isFocus) {
      ref.$el.children[0].focus();
    }
    if (isSelect) {
      ref.inputSelect();
    }
  },

  /**
   * 深拷贝
   *
   * @param {*} obj
   * @param {Array<Object>} cache
   * @return {*}
   */
  deepCopy(obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    const hit = this.find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}

    cache.push({
      original: obj,
      copy
    })

    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })

    return copy
  },

  find(list, f) {
    return list.filter(f)[0]
  },

  /**
   * forEach for object
   */
  forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
  },


  //上传文件
  /**
   * 上传图片
   * @param  {string}   url          服务器上传请求地址
   * @param  {obj}      data         文件信息
   * @param  {string}   fileType     文件类型
   * @param  {string}   fileErrorMsg 文件类型错误提示
   * @param  {string}   field        字段名
   * @param  {string}   path         文件存储路径，如用户头像，传user
   * @param  {function} uploadingFn  上传中回调函数
   * @param  {function} successFn    上传成功回调函数
   * @param  {function} failerFn     上传失败回调函数
   * @return {Promise}              
   */

  uploadFile(url, data, fileType, fileErrorMsg, field, path, noShowProgress, uploadingFn, successFn, failerFn) {
  },

   /**
   * 将对象转成 a=1&b=2的形式
   * @param obj 对象
   */
  obj2String(obj, arr = [], idx = 0) {
    for (let item of obj) {
      arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
  },
  /**
   * 如果是在微信浏览器里面，就注入微信JsSDK
   */
  injectWXJsSDK() {
    const script = document.createElement('script');
    script.src = '//res.wx.qq.com/open/js/jweixin-1.3.2.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = this.scriptOnload;
  }
};

//导出util
export default util;
