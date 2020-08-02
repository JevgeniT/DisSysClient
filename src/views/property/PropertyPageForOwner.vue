<template>
    <v-container fluid>
      <h2>Properties you own</h2>
            <v-row dense>
              <v-col cols="12" class="d-flex" justify="start" >
                <v-row>
                <v-card v-for="p in response" v-bind:key="p.id" class="d-flex flex-column">
                  <v-img src="https://via.placeholder.com/150"></v-img>
                  <v-card-title>
                    {{p.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{p.address}}, {{p.country}}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-list-item-content>
                      <v-list-item>
                        #
                      </v-list-item>
                    </v-list-item-content>
                  </v-card-text>
                  <v-card-actions>
                    <router-link :to="{name:'PropertyOwnerInfo', params:{id: p.id}}"><v-btn primary>Check</v-btn></router-link>
                  </v-card-actions>
                </v-card></v-row>
              </v-col>
            </v-row>
     </v-container>
</template>

<script>
export default {
  name: 'PropertyPageForOwner',
  data () {
    return {
      response: {},
      drawer: true

    }
  },
  beforeMount () {
    this.getProperty()
  },
  methods: {
    async getProperty () {
      const id = this.$route.params.id
      const token = localStorage.getItem('jwt')
      const res = await fetch('https://localhost:5001/api/v1.0/property/' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      this.response = await res.json()
    },
    async createProperty () {
      return null
    }
  }
}
</script>

<style scoped>

</style>
