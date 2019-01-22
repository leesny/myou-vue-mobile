/**
 * 注册httpCall为vue全局方法，直接在vue组件里面调用this.httpCall;
 */
import httpCall from './httpAdapter';

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Object.defineProperties(Vue.prototype, {
    httpCall: {
      get() {
        return httpCall
      }
    }
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
