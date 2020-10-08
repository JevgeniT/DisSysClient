import api from '@/services/api'

export const policyModule = {
  namespaced: true,
  state: () => ({ policies: {} }),
  mutations: {
    setPolicies (state, items) {
      state.policies = items
    }
  },
  actions: {
    async loadData ({ commit }, id) {
      await api.policies.all({ pId: id })
        .then((response) => {
          commit('setPolicies', response.data)
        })
    }
  },
  getters: {
    getPolicies: state => {
      return state.policies
    }
  }
}
