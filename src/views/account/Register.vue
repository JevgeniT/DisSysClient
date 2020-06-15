<template>
    <div class="row">
        <div class="col-md-6">
<!--            <h4>Use a local account to log in.</h4>-->
            <h2 v-if="loginWasOk === false">Bad login attempt</h2>
            <hr />
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input v-model="registerDTO.email" class="form-control" type="email" id="Input_Email" />
            </div>
            <div class="form-group">
                <label for="Input_firstName">First name</label>
                <input v-model="registerDTO.firstname" class="form-control" type="text" id="Input_firstName" />
            </div>
            <div class="form-group">
                <label for="Input_lastName">First name</label>
                <input v-model="registerDTO.lastname" class="form-control" type="text" id="Input_lastName" />
            </div>
<!--            <div class="form-group">-->
<!--                <label for="Input_role">First name</label>-->
<!--                <input v-model="registerDTO.ishost" class="form-control" type="checkbox" id="Input_role" />-->
<!--            </div>-->
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                        v-model="registerDTO.password"
                        class="form-control"
                        type="password"
                        id="Input_Password"
                />
            </div>
            <div class="form-group">
                <button @click="registerOnClick($event)" class="btn btn-primary"> Register</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IRegisterDTO } from "@/types/ILoginDTO";
import store from "../../store";
import router from "../../router";

@Component
export default class Index extends Vue {
    private registerDTO: IRegisterDTO = {
        email: "user@user.com",
        password: "qweqwe",
        firstname: "test",
        lastname: "test",
        ishost: false
    };

    private loginWasOk: boolean | null = null;

    registerOnClick(): void {
        if (
            this.registerDTO.email.length > 0 &&
            // eslint-disable-next-line eqeqeq
            this.registerDTO.password.length > 0
        ) {
            store
                .dispatch("register", this.registerDTO)
                .then((isLoggedIn: boolean) => {
                    if (isLoggedIn) {
                        this.loginWasOk = true;
                        router.push("/");
                    } else {
                        this.loginWasOk = false;
                    }
                });
        }
    }
}
</script>
