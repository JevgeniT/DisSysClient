<template>
    <div class="container">
        <PropertyNav/>
     <v-card v-model="property" >
       <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
       height="200px"></v-img>
        <v-card-title>{{property.name}}</v-card-title>
        <v-card-subtitle>{{property.country}},{{property.address}}</v-card-subtitle>
        <v-card-text>
        </v-card-text>
    </v-card>
        <v-spacer></v-spacer>
    <v-container fluid>
      <h3>Rooms you have: </h3>
        <v-row>
            <v-col cols="12">
                <v-row justify="space-between">
                    <v-card v-for="room in property.propertyRooms" v-bind:key="room.id"
                            class="mx-auto"
                            max-width="400">
                            <v-img src="https://via.placeholder.com/150"></v-img>
                        <v-card-title>
                            {{room.name}}
                        </v-card-title>
                       <v-card-actions>
                         <router-link :to="{name:'Rooms', params:{id: room.id}}"><v-btn color="blue" text>Check</v-btn></router-link>
                       </v-card-actions>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
import PropertyNav from '@/views/property/PropertyNav'
export default {
  name: 'PropertyInfo',
  components: { PropertyNav },
  data () {
    return {
      property: {},
      items: ['Hotel', 'Apartments', 'Hostel'],
      isOk: '',
      data: {},
      rooms: []
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
      this.data = await res.json()
    },
    async createProperty () {
      const token = localStorage.getItem('jwt')
      const request = new Request('https://localhost:5001/api/v1.0/property/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(this.property)
      })
      const res = await fetch(request)
      this.data = await res.json()
      if (res.status === 201) {
        this.isOk = ' OK '
      }
    }
  }
}
</script>

<style scoped>

</style>
