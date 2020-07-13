import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import AccountLogin from '../views/account/Login.vue'
import AccountRegister from '../views/account/Register.vue'
import SearchResult from "@/components/SearchResult.vue"
import PropertyPage from "@/components/PropertyPage.vue";
import PropertyRoom from "@/components/RoomDetails.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    { path: '/', name: 'Home', component: Home },
    { path: '/account/login', name: 'AccountLogin', component: AccountLogin },
    { path: '/account/register', name: 'AccountRegister', component: AccountRegister },
    { path: '/find', name: 'FindStay', component: SearchResult },
    { path: '/property/:id', name: 'propertyInfo', component: PropertyPage }]

const router = new VueRouter({
    routes
})

export default router
