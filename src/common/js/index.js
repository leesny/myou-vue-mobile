/**
 * 将工具方法注册为VUE插件
 */
import util from './utils/util.js'
import emojiUtil from './utils/emojiUtil.js'
import debounce from './utils/debounce.js'
import browser from './utils/browser.js'
import storage from './utils/storage.js'
import msg from './comp/msg.js'
import notification from './comp/notification.js'
import flowUtil from './business/flowUtil.js'

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }
  Object.defineProperties(Vue.prototype, {
    util: {
      get() {
        return util
      }
    },
    emojiUtil: {
      get() {
        return emojiUtil
      }
    },
    debounce: {
      get() {
        return debounce
      }
    },
    browser: {
      get() {
        return browser
      }
    },
    storage: {
      get() {
        return storage
      }
    },
    msg: {
      get() {
        return msg
      }
    },

    notification: {
      get() {
        return notification
      }
    },

    flowUtil: {
      get() {
        return flowUtil
      }
    }
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
