import * as types from '@/store/mutation-types';
import util from '@/common/js/utils/util';

// 系统设置
export default {
  namespaced: true,
  state: {
    voiceStatus: true, // 消息语言允许
    msgWinAllowed: true // 消息弹窗允许
  },
  actions: {
    switchVoice({ dispatch, commit }, status) {
      commit(types.SAVE_OA_VOICE_STATUS, status)
    },

    switchMsgWinOpened({ dispatch, commit }, allowed) {
      commit(types.SAVE_OA_MSG_WIN_ALLOWED, allowed)
    }
  },
  mutations: {
    [types.SAVE_OA_VOICE_STATUS](state, status) {
      if (status == null) {
        status = !state.voiceStatus
      }
      state.voiceStatus = status
      util.storage.local.set('voiceStatus', status)
    },

    [types.SAVE_OA_MSG_WIN_ALLOWED] (state, allowed) {
      if (allowed == null) {
        allowed = !state.msgWinAllowed
      }
      state.msgWinAllowed = allowed
      util.storage.local.set('msgWinAllowed', allowed)
    }
  },
  getters: {
    voiceStatus: state => {
      if (state.voiceStatus != null) {
        return state.voiceStatus;
      }

      let cache = util.storage.local.get('voiceStatus');
      if (cache != null) {
        return cache;
      }

      return true;
    },

    msgWinAllowed: state => {
      if (state.msgWinAllowed != null) {
        return state.msgWinAllowed;
      }

      let cache = util.storage.local.get('msgWinAllowed');
      if (cache != null) {
        return cache;
      }

      return true;
    }
  }
}
