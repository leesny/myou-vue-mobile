import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'
import CreatePersistedState from 'vuex-persistedstate'
import modules from './modules'

vue.use(vuex)

// 公共state
const state = {
  isLoading:false
}

// vuex持久化插件
const vuexPersisted = new CreatePersistedState({
  key: 'myVuex',
  storage: window.localStorage,
  reducer: state => ({
    isLoading:state.isLoading
  }),
  filter: mutation => (
     mutation.type === 'CHANGE_LOADING'
  )
});

export default new vuex.Store({
  state,
  getters,
  mutations,
  modules,
  plugins: [vuexPersisted]
})
