<template>
<v-container class="container-fluid">
     <v-col v-for="res in reservations" v-bind:key="res.id" cols="12">
         <v-card >
           <v-row>
             <v-col cols="2">
               <v-avatar class="ma-2" size="150" tile>
                 <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
               </v-avatar>
             </v-col>
             <v-col>
               <v-card-text>
                 <v-card-title><router-link :to="{name: 'reservationInfo', params:{id: res.id}}">{{res.propertyName}}</router-link></v-card-title>
                 <v-card-subtitle>{{utcDates(res.checkInDate, res.checkOutDate)}}</v-card-subtitle>
                 <v-card-text>{{res.active?'Active':'Inactive'}}</v-card-text>
               </v-card-text>
             </v-col>
           </v-row>
         </v-card>
     </v-col>
</v-container>
</template>

<script>
import helpers from "@/services/helpers";

export default {
  data () {
    return {
      reservations: {}
    }
  },
  beforeMount () {
    this.getUserReservations()
  },
  methods: {
    async getUserReservations () {
      return await this.$api.reservations.all().then((r) => { this.reservations = r.data })
    },
    utcDates(from, to) {
      return helpers.utcDates(from)+ ' - ' + helpers.utcDates(to)
    }
  }
}
</script>

<style scoped>

</style>
