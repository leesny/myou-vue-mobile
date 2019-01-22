import * as types from '@/store/mutation-types'
import httpCall from '@/common/js/http/httpAdapter'
import notification from '@/common/js/comp/notification.js'

// 定时任务
export default {
  namespaced: true,

  state: {
    newestMsg: {}
  },
  actions: {
    getOaNewestMessage ({ dispatch, commit }, allowed) {
      // 调用统一的后台API接口
      let skipInterceptor = true
      return httpCall.get('/msg/getNewestMsg', null, false, skipInterceptor).then(res => {
        console.log('消息API调用结果  >>>', res)
        if (res && res.data) {
          commit('SAVE_NEWEST_MSG', { msg: res.data, allowed: allowed })
          return res.data
        }

        return null
      }).catch(e => {
        console.log('消息API调用ERROR >>>', e)
      })
    }
  },
  mutations: {
    [types.SAVE_NEWEST_MSG] (state, data) {
      state.newestMsg = data.msg

      // 消息弹窗
      let allowed = data.allowed
      if (allowed) {
        let msgType = data.msg.msgType || 1
        switch (msgType) {
          case 1:
            notification.info(data.msg.msgTitle || '您收到一条寻呼消息', "寻呼消息");
            break;
          case 2:
            notification.warn(data.msg.msgTitle || '您收到一条流程消息', "流程消息");
            break;
          case 3:
            notification.error(data.msg.msgTitle || '您收到一条预警消息', "预警消息");
            break;
          default:
            break;
        }
      }
    }
  },
  gettters: {
    newestMsg: state => state.newestMsg
  }
}
