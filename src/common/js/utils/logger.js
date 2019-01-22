/**
 * 本地调试日志
 */
import Constant from '@/Constant'
var DebugLogger = {};

function install(Vue) {
  if (install.installed) return;
  install.installed = true;

  //添加实例方法
  Vue.prototype.$logger = function(message) {
    if (Constant.env.NODE_ENV != 'production') {
      console.log(message);
    }
  }
}
DebugLogger.install = install;
export default DebugLogger;
