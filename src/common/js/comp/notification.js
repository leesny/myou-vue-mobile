import miniToastr from 'mini-toastr'

miniToastr.init()

/**
 * 组件 - 信息提示框
 * @type       {Object}
 */
export default {
  success: function(message, title, timeout, cb, config = {}) {
    return miniToastr.success(message, title, timeout, cb, config)
  },
  info: function(message, title, timeout, cb, config = {}) {
    return miniToastr.info(message, title, timeout, cb, config)
  },
  warn: function(message, title, timeout, cb, config = {}) {
    return miniToastr.warn(message, title, timeout, cb, config)
  },
  error: function(message, title, timeout, cb, config = {}) {
    return miniToastr.error(message, title, timeout, cb, config)
  }
};
