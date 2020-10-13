<template>
  <v-container class="container-fluid">
    <v-col cols="12">
    <h5>Thanks {{reservation.reservedBy}}!</h5>
    <h5>Your reservation in {{reservation.propertyName}} is confirmed.</h5>
    <br>
    <h4>{{reservation.propertyName}}</h4>
    <h6>{{reservation.propertyLocation}}</h6>
    <h6></h6>
    <v-row>
      <v-col cols="3">
        <v-img src="https://via.placeholder.com/150" height="160"></v-img>
      </v-col>
      <v-col cols="3">
        <v-img src="https://via.placeholder.com/150" height="160"></v-img>
      </v-col>
    </v-row>
    <v-simple-table>
      <tbody>
      <tr>
        <td>Your reservation</td>
        <td>{{getDates(this.reservation.checkInDate, this.reservation.checkOutDate)}} night(s)</td>
      </tr>
      <tr>
        <td>Check-in</td>
        <td>{{reservation.checkInDate}}</td>
      </tr>
      <tr>
        <td>Check-out</td>
        <td>{{reservation.checkOutDate}}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{{reservation.totalPrice}}</td>
      </tr>
      </tbody>
    </v-simple-table>
    </v-col>
  </v-container>



<!--  <p v-for="r in reservation.roomDtos" v-bind:key="r.id">{{r.name}}</p>-->
</template>

<script>
import helpers from "@/services/helpers";
export default {
  data () {
    return {
      reservation: {}
    }
  },
  beforeMount () {
    this.getReservation()
  },
  methods: {
    ...helpers,

    async getReservation () {
      return await this.$api.reservations.byId(this.$route.params.id)
          .then((r) => {this.reservation = r.data})
    }
  }
}
</script>

<style scoped>

</style>