import api from '@/services/api'

export const reservationModule = {
    namespaced: true,
    state: () => ({ reservation: {} }),
    mutations: {
        setReservation (state, items) {
            state.reservation = items
        }
    },
    actions: {
         fetchReservation ({ commit }, request) {
           return api.reservations.byId(request)
                .then((response) => {
                     commit('setReservation', response.data)
                 }).catch(({response}) => {
                     response.data.notFound = true
                    commit('setReservation', response.data)
                })
        },
    },
    getters: {
        getReservation: state => {
            return state.reservation
        }
    }
}
