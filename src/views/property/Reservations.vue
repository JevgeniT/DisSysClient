<template>
  <v-card>
    <v-card-title>
      Reservations
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="reservations"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'Reservations',
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Reservation #',
          align: 'start',
          sortable: false,
          value: 'reservationNumber'
        },
        { text: 'Reserved by', value: 'reservedBy' },
        { text: 'Check in', value: 'checkInDate' },
        { text: 'Check out', value: 'checkOutDate' },
        { text: 'Price', value: 'totalPrice' },
        { text: 'Status', value: 'isCancelled' }
      ],
      reservations: []
    }
  },
  beforeMount () {
    this.getReservations()
  },
  methods: {
    async getReservations () {
      const res = this.$api.reservations.all({ pId: this.$route.params.id }).then((r) => { this.reservations = Object.values(r.data) })
      console.log(this.reservations)
      return res
    }
  }
}
</script>

<style scoped>

</style>
