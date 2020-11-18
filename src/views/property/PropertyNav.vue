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
      <v-tab>
        Rules
      </v-tab>
      <v-tab>
        Extra
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
      <v-tab-item>
        <PropertyRules/>
      </v-tab-item>
      <v-tab-item>
        <Extra/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import PropertyRooms from '@/views/property/rooms/PropertyRooms'
import Reservations from '@/views/property/Reservations'
import Policy from '@/views/property/Policy'
import PropertyRules from "@/components/PropertyRules";
import Extra from "@/views/property/Extra";

export default {
  components: { Policy, PropertyRooms, Reservations, PropertyRules, Extra },
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
    .toolbar .text {
        padding-left: 15px;
        color: white;
        text-decoration:none;
    }
</style>
