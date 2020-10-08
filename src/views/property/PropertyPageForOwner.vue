<template>
    <v-container>
      <h2>Properties you own</h2>
      <v-expansion-panels inset >
        <v-expansion-panel>
          <v-expansion-panel-header><v-icon>mdi-plus</v-icon></v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card elevation="0">
              <v-card-title>Create property</v-card-title>
              <v-card-text>
                <v-text-field label="Name" v-model="property.name"></v-text-field>
                <v-text-field label="Address" v-model="property.address"></v-text-field>
                <v-text-field label="Description" v-model="property.description"></v-text-field>
                <v-text-field label="Country" v-model="property.country"></v-text-field>
                <v-select :items="items" v-model="property.type" label="Type"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="primary" @click="createProperty">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
            <v-row class="ma-2">
              <v-col v-for="p in properties" :key="p.id" class="pa-4 d-flex flex-column" md="4">
                <v-card class="elevation-5 flex d-flex flex-column">
                  <v-img src="https://via.placeholder.com/150"
                  ></v-img>
                  <v-card-title primary-title>
                    {{p.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{p.address}}, {{p.country}}
                  </v-card-subtitle>
                  <v-card-text  class="flex">
                    <v-list-item-content>
                      <v-list-item>
                        #
                      </v-list-item>
                    </v-list-item-content>
                  </v-card-text>
                  <v-card-actions>
                    <router-link :to="{name:'PropertyOwnerInfo', params:{id: p.id}}"><v-btn primary>Check</v-btn></router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
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
      items: ['Hotel', 'Hostel', 'Apartments']
    }
  },
  beforeMount () {
    this.getProperty()
  },
  methods: {
    async getProperty () {
      return this.$api.property.all().then((r) => { this.properties = r.data })
    },
    async createProperty () {
      console.log(this.property.type)
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

</style>
