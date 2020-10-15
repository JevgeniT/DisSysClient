import api from '@/services/api'

export const searchModule = {
    namespaced: true,
    state: () => ({ response: {} }),
    mutations: {
        setResponse (state, items) {
            state.response = items
        }
    },
    actions: {
        async findProperties ({ commit }, request) {
            await api.property.find(request)
                .then((response) => {
                    commit('setResponse', response.data)
                }).catch(({response}) =>
                {
                    response.data.notFound = true

                    commit('setResponse', response.data)
                })
        },
        async checkDates ({ commit }, request) {
            await api.dates.check(request)
                .then((response) => {
                    commit('setResponse', response.data)
                }).catch(({response}) =>
                {

                })
        }
    },
    getters: {
        getResponse: state => {
            return state.response
        }
    }
}
