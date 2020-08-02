import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountLogin from '../views/account/Login.vue'
import AccountRegister from '../views/account/Register.vue'
import SearchResult from '@/components/SearchResult.vue'
import PropertyPage from '@/components/PropertyPage.vue'
import PropertyPageForOwner from '@/views/property/PropertyPageForOwner.vue'
import PropertyInfo from '@/views/property/PropertyInfo.vue'
import PropertyRooms from '@/views/property/rooms/PropertyRooms.vue'
import Calendar from '@/views/property/Calendar.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/account/login', name: 'AccountLogin', component: AccountLogin },
    { path: '/account/register', name: 'AccountRegister', component: AccountRegister },
    { path: '/find', name: 'FindStay', component: SearchResult },
    { path: '/property/:id', name: 'propertyInfo', component: PropertyPage, props: true },
    { path: '/propertyOwner', name: 'owner', component: PropertyPageForOwner },
    { path: '/propertyInfo/:id', name: 'PropertyOwnerInfo', component: PropertyInfo, props: true },
    { path: '/propertyRooms/:id', name: 'Rooms', component: PropertyRooms, props: true },
    { path: '/calendar', name: 'Calendar', component: Calendar, props: true }
  ]
})
