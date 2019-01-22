import * as types from '@/store/mutation-types';

export default {
  namespaced: true,
  state: {
    // 组件相关
    loading: false,
    progress: {
      show: false,
      title: '上传进度',
      value: 20,
      variant: 'info'
    }
  },

  actions: {
    showLoading({ commit }, show) {
      commit(types.LOADING, show);
    },
    showProgress({ commit }, { show, title, value, variant }) {
      commit(types.PROGRESS, { show, title, value, variant });
    },
  },

  mutations: {
    [types.LOADING](state, show) {
      state.loading = show;
    },
    [types.PROGRESS](state, progress) {
      console.log(progress)
      progress.show = progress.show || progress.value < 100;
      state.progress = Object.assign(state.progress, progress);
    },
  },

  getters: {
    loading: state => state.loading,
    progress: state => state.progress
  }
}
