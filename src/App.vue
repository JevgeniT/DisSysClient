
<template>
  <div>
    <header>
        <nav class="navbar navbar-default navbar-expand-lg navbar-light">
            <div class="navbar-header d-flex col">
                <a class="navbar-brand" href="/"><router-link to="/">Brand</router-link><b></b></a>
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
                    <span class="navbar-toggler-icon"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
                <ul class="nav navbar-nav">
                    <li class="nav-item"><a href="#" class="nav-link"><router-link to="/find">Search</router-link></a></li>
                    <li class="nav-item"><a href="#" class="nav-link">About</a></li>
                </ul>
            </div>
            <Identity/>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Identity from './components/Identity.vue';
import SearchResult from './components/SearchResult.vue';
  @Component({
      components: {
          Identity, SearchResult
      }
  })
export default class App extends Vue {}
</script>
<style>
    @import './assets/site.css';
</style>
