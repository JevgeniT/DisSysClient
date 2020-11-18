<template>
<v-container>
  <v-card v-model="room" >
    <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
           height="200px"></v-img>
    <v-card-title>{{room.name}}</v-card-title>
    <v-card-text>
      <p>Room size: {{room.size}}</p>
      <p>Adult occupancy: {{room.adultsOccupancy}}</p>
      <p>Child occupancy: {{room.childOccupancy}}</p>
    </v-card-text>
  </v-card>
  <v-spacer></v-spacer>
  <template v-if="!room.id">
    <v-progress-circular
        :width="3"
        color="green"
        indeterminate
    ></v-progress-circular>
  </template>
  <template v-else>
    <calendar :room="room"/>
  </template>
</v-container>
</template>

<script>
import Calendar from '@/views/property/Calendar'
export default {
  components: { Calendar },
  data () {
    return {
      room: {}
    }
  },
  beforeMount () {
    this.getRoom()
  },
  methods: {
    async getRoom () {
     return await this.$api.rooms.byId(this.$route.params.id).then((r) => {
        this.room = r.data
      })
    }
  }
}
</script>
