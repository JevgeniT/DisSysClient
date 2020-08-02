<template>
<v-container>
  <v-card v-model="room" >
    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
           height="200px"></v-img>
    <v-card-title>{{room.name}}</v-card-title>
    <v-card-text>
      Adults capacity: <p>{{room.adultsCapacity}}</p>
      Child capacity: <p>{{room.childCapacity}}</p>
      Size: <p>{{room.size}} m2</p>
     <v-spacer></v-spacer>
      <h4>Room facilities</h4>
          <v-sheet elevation="" class="pa-4">
            <v-chip-group
                column
                active-class="primary--text"
            >
              <v-chip v-for="f in room.roomFacilities" :key="f.id">
                {{ f.name }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: 'PropertyRooms',
  data () {
    return {
      room: {},
      isOk: '',
      data: null,
      items: ['Large', 'Single']
    }
  },
  methods: {
    async createProperty () {
      const token = localStorage.getItem('jwt')
      const request = new Request('https://localhost:5001/api/v1.0/room/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(this.room)
      })
      const res = await fetch(request)
      this.data2 = await res.json()
      if (res.status === 201) {
        this.isOk = ' OK '
      }
    }
  }
}
</script>

<style scoped>

</style>
