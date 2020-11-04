<template>
    <div class="row">
        <div class="col-md-6">
            <h4>Use a local account to log in.</h4>
            <v-alert type="error" v-if="loginWasOk === false">Bad login attempt</v-alert>
            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="user.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                        v-model="user.password"
                        class="form-control"
                        type="password"
                        id="Input_Password"
                />
            </div>
            <div class="form-group">
                <button @click="loginOnClick()" class="btn btn-primary">Log in</button>
            </div>
        </div>
    </div>
 </template>

<script >
import store from '../../store/index'
import router from '../../router/index'
import { User } from '@/types/User'

export default {
  name: 'Login',
  data () {
    return {
      user: new User('host@host.com', 'qweqwe'), // placeholder
      loading: false,
      loginWasOk: null
    }
  },
  methods: {
    loginOnClick () {
      if (this.user.email.length > 0 && this.user.password.length > 0) {
        store.dispatch('authenticateUser', this.user)
          .then((isLoggedIn) => {
            if (isLoggedIn) {
              this.loginWasOk = true
              router.push('/')
            }
          }, () => {
            this.loginWasOk = false
          })
      }
    }
  }
}
</script>
