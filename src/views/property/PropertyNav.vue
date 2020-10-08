<template>
  <v-card>
    <v-tabs
        v-model="tab"
        background-color="transparent"
        grow
    >
      <v-tab>
        Rooms
      </v-tab>
      <v-tab>
        Reservations
      </v-tab>
      <v-tab>
        Policies
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-tabs-items
        v-model="tab"
    >
      <v-tab-item>
       <PropertyRooms/>
      </v-tab-item>
      <v-tab-item>
        <Reservations/>
      </v-tab-item>
      <v-tab-item>
        <Policy/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import PropertyRooms from '@/views/property/rooms/PropertyRooms'
import Reservations from '@/views/property/Reservations'
import Policy from '@/views/property/Policy'
export default {
  components: { Policy, PropertyRooms, Reservations },
  data () {
    return {
      tab: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
    .toolbar {
        font-weight: bold;
        font-size: 18px;
    }

    .toolbar .text {
        padding-left: 15px;
        color: white;
        text-decoration:none;
    }

    .item-title {
        font-size: 17px;
        font-weight: 500;
    }
    .item-sub-title {
        font-size: 15px;
        font-weight: 500;
    }

    .active {
        font-weight: bold;
    }
</style>
