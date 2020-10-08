<template>
  <div>
    <header>
        <nav class="navbar navbar-default navbar-expand-lg navbar-light">
            <div class="navbar-header d-flex col">
                <a class="navbar-brand" href="/"><router-link to="/">
                  <span id="logo">retrip</span>
                </router-link><b></b></a>
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
                    <span class="navbar-toggler-icon"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <Identity/>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            <v-app>
                <router-view />
            </v-app>
      </main>
    </div>
  </div>
</template>
<script>
import Identity from './components/Identity.vue'

export default {
  name: 'app',
  components: {
    Identity
  }
}
</script>
<style>
    @import './assets/site.css';
</style>
