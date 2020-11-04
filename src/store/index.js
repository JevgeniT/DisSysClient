import Vue from 'vue'
import Vuex from 'vuex'
import AccountService from '@/services/AccountService'
import { policyModule } from './policyModule'
import { searchModule } from './searchModule'
import { reservationModule } from '@/store/reservationModule';
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
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
    policyModule, searchModule, reservationModule
  }
})
