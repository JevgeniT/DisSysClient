<template>
    <v-container>
      <h3>Properties you own</h3>
      <v-expansion-panels content-class="elevation-0" >
        <v-expansion-panel  >
          <v-expansion-panel-header disable-icon-rotate>
            <v-icon>mdi-plus</v-icon>
            <template v-slot:actions>
              <v-icon color="white">
                mdi-alert-circle
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="elevation-1">
              <v-card-title>Create property</v-card-title>
              <v-card-text>
                <v-row ref="form">
                  <v-col cols="11" sm="6">
                    <v-text-field  :rules="[rules.required]" label="Name" v-model="property.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field  :rules="[rules.required]" label="Country" v-model="property.country"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field  :rules="[rules.required]" label="Address" v-model="property.address"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field  :rules="[rules.required]" label="Description" v-model="property.description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select  :rules="[rules.required]" :items="items" v-model="property.type" label="Type"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                      <v-btn text color="primary" @click="createProperty" >Create</v-btn>
                   </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-col v-for="p in properties" :key="p.id" cols="12">
        <v-card>
          <div class="d-flex">
            <v-avatar  class="ma-3" size="170" tile>
              <v-img src="https://via.placeholder.com/150"
              ></v-img>
            </v-avatar>
            <v-card-text>
              <v-card-title>{{p.name}}</v-card-title>
              <v-card-subtitle>{{p.address}}, {{p.country}}</v-card-subtitle>
            </v-card-text>
            <v-card-actions>
              <router-link :to="{name:'PropertyOwnerInfo', params:{id: p.id}}"><v-btn  color="primary" outlined text>Check</v-btn></router-link>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
     </v-container>
</template>

<script>
export default {
  name: 'PropertyPageForOwner',
  data () {
    return {
      properties: {},
      drawer: true,
      property: {},
      items: ['Hotel', 'Hostel', 'Apartments'],
      rules: {
        required: value => !!value || 'Required.'}
    }
  },
  beforeMount () {
    this.getProperty()
  },
  methods: {
    async getProperty () {
      return await this.$api.property.all().then((r) => { this.properties = r.data })
    },

    async createProperty () {
      return await this.$api.property.post(JSON.stringify(this.property)).then((r) => {
        if (r.status === 201) {
          this.properties.push(r.data)
        }
      })
    }
  }
}
</script>

<style scoped>
.v-expansion-panel::before {
  box-shadow: none;
}
</style>
