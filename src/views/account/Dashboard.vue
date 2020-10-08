<template>
<v-container>
 <v-card>
   <v-card-text>
     <p v-for="r in reservations" v-bind:key="r.id">
       {{r.reservationNumber}}
       {{r.id}}
     </p>
   </v-card-text>
 </v-card>
</v-container>
</template>

<script>
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
      return this.$api.reservations.all().then((r) => { this.reservations = r.data })
    }
  }
}
</script>

<style scoped>

</style>
