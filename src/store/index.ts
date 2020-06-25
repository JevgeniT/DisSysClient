import Vue from 'vue'
import Vuex, { } from 'vuex'
import { ILoginDTO, IRegisterDTO } from '@/types/ILoginDTO';
import { AccountApi } from '@/services/AccountApi';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: null as string | null
    },
    mutations: {
        setJwt(state, jwt: string | null) {
            state.jwt = jwt;
        }
    },
    getters: {
        isAuthenticated(context): boolean {
            return context.jwt !== null;
        }
    },
    actions: {
        clearJwt(context): void {
            context.commit('setJwt', null);
        },
        async authenticateUser(context, loginDTO: ILoginDTO): Promise<boolean> {
            const jwt = await AccountApi.getJwt(loginDTO);
            context.commit('setJwt', jwt);
            return jwt !== null;
        },
        async register(context, registerDTO: IRegisterDTO): Promise<boolean> {
            const jwt = await AccountApi.register(registerDTO);
            context.commit('setJwt', jwt);
            return jwt !== null;
        }
    },
    modules: {
    }
})
