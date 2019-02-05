import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      if (user) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})