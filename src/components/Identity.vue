<template>
  <div v-if="isAuthenticated">
    <v-btn text to="/dashboard">{{userEmail}}</v-btn>
    <v-btn v-if="isHost" class="ma-2" text color="primary" ><router-link to="/propertyOwner" >Details</router-link></v-btn>
    <v-btn @click="logoutOnClick" text color="primary">Logout</v-btn>
  </div>
  <div v-else>
    <v-btn class="ma-2" text  color="primary"  ><router-link to="/account/login">Login</router-link></v-btn>
    <v-btn class="ma-2" text  color="primary" ><router-link to="/account/register">Signup</router-link></v-btn>
  </div>
</template>
<script>
import store from '../store/index'
import router from '../router'
import JwtDecode from 'jwt-decode'

export default {
  name: 'Identity',
  methods: {
    logoutOnClick () {
      localStorage.clear()
      router.push('/').catch(e => {})
    }
  },
  computed: {
    userEmail () {
      if (localStorage.getItem('jwt')) {
        const decoded = JwtDecode(localStorage.getItem('jwt'))
        return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
       }
      return 'null'
    },
    isAuthenticated () {
      console.log(localStorage.getItem('jwt') !== null)
      return localStorage.getItem('jwt') !== null;
    },
    isHost () {
      if (store.state.jwt) {
        const decoded = JwtDecode(store.state.jwt)
        return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'host'
      }
      return 'null'
    }
  }
}
</script>
