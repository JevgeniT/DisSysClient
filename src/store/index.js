import Vue from 'vue'
import Vuex from 'vuex'
import AccountService from '@/services/AccountService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwt: null
  },
  mutations: {
    setJwt (state, jwt) {
      state.jwt = jwt
    }
  },
  getters: {
    isAuthenticated (context) {
      return context.jwt !== null
    }
  },
  actions: {
    clearJwt (context) {
      context.commit('setJwt', null)
    },
    async authenticateUser (context, user) {
      const jwt = await AccountService.login(user)
      context.commit('setJwt', jwt)
      return jwt !== null
    },
    async register (context, user) {
      const jwt = await AccountService.register(user)
      context.commit('setJwt', jwt)
      return jwt !== null
    }
  },
  modules: {
  }
})
