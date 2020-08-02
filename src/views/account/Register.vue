<template>
    <div class="row">
        <div class="col-md-6">
          <h4>Create your account</h4>
            <hr />
            <v-alert type="error" v-if="message">{{message}}</v-alert>

            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="userRegister.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_firstName">First name</label>
                <input v-model="userRegister.firstname" class="form-control" type="text" id="Input_firstName" />
            </div>
            <div class="form-group">
                <label for="Input_lastName">First name</label>
                <input v-model="userRegister.lastname" class="form-control" type="text" id="Input_lastName" />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                        v-model="userRegister.password"
                        class="form-control"
                        type="password"
                        id="Input_Password"
                />
            </div>
            <div class="form-group">
                <button @click="registerOnClick()" class="btn btn-primary"> Register</button>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../store/index'
import router from '../../router/index'
import { UserRegister } from '@/types/User'

export default {
  name: 'Register',
  data: () => ({
    userRegister: new UserRegister('', '', '', ''),
    registerWasOk: null,
    message: ''
  }),
  methods: {
    registerOnClick () {
      if (
        this.userRegister.email.length > 0 &&
        this.userRegister.password.length > 0
      ) {
        store
          .dispatch('register', this.userRegister)
          .then((isOk) => {
            if (isOk) {
              this.registerWasOk = true
              router.push('/')
            }
          }).catch(e => {
            this.message = e.response.data.messages[0]
          })
      }
    }
  }
}
</script>
