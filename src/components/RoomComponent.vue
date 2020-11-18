<template>
<v-container>
  <v-col v-for="room in rooms" v-bind:key="room.id" cols="12">
    <v-card class="elevation-0">
      <div class="d-flex" >
        <v-avatar
            class="ma-3"
            size="170"
            tile>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
        </v-avatar>
        <v-card-text>
          <v-card-title class="headline">{{room.name}}</v-card-title>
          <p>Adults occupancy: {{room.adultsOccupancy}}</p>
          <p>Child occupancy: {{room.childOccupancy}}</p>
          <p>Size: {{room.size}} m2</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" outlined text :to="{ name: 'RoomInfo', params: { id: room.id }}">Details</v-btn>
        </v-card-actions>
        <slot></slot>
      </div>
    </v-card>
    <v-divider></v-divider>
  </v-col>
</v-container>
</template>
<script>
export default {
  name: 'RoomComponent',
  data () {
    return {
    }
  },
  props: {
    rooms: {},
    owner: Boolean
  },
  beforeMount () {
    if (this.rooms == null) {
      this.getRooms()
    }
  },
  methods: {
    async getRooms () {
      return this.$api.property.byId(this.$route.params.id).then((r) => { this.rooms = r.data.propertyRooms })
    }
  }
}
</script>
<style scoped>

</style>
