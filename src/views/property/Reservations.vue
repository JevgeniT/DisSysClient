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
import helpers from "@/services/helpers";

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
        { text: 'Active', value: 'active' }
      ],
      reservations: []
    }
  },
  beforeMount () {
    this.getReservations()
  },
  methods: {
    async getReservations () {
      return await this.$api.reservations.all({ pId: this.$route.params.id }).then((r) =>
      {
        this.reservations = Object.values(r.data)
        this.reservations.map(function (d) {
          d.checkInDate = helpers.isoDate(d.checkInDate)
          d.checkOutDate = helpers.isoDate(d.checkOutDate)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
