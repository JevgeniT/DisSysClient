<template>
  <v-container class="container-fluid">
    <v-col cols="12">
    <h5><v-icon color="green">mdi-check</v-icon>Thanks {{reservation.reservedBy}}!</h5>
    <h5><v-icon color="green">mdi-check</v-icon>Your reservation in {{reservation.propertyName}} is confirmed.</h5>
    <br>
    <h4>{{reservation.propertyName}}</h4>
    <h6>{{reservation.propertyLocation}}</h6>
    <h6></h6>
    <v-row align-content="center">
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
      <v-divider></v-divider>
      <v-row alighn="center" justify="space-around">
        <v-btn v-if="!inPast" outlined text color="danger">
          Cancel reservation
        </v-btn>
        <v-btn v-if="inPast && reservation.review == null" outlined text color="success" :to="{name:'review'} ">
          <router-view :res="reservation"></router-view>
          Rate your stay
        </v-btn>
      </v-row>
    </v-col>
      <p v-for="r in reservation.roomDtos" v-bind:key="r.id">{{r.name}}</p>

    <v-container v-if="reservation.review">
      <v-card elevation="0">
        <v-card-title>Review</v-card-title>
        <v-card-subtitle>Submitted {{ reservation.review.createdAt }}</v-card-subtitle>

        <v-card-text>
          <p>Score {{reservation.review.score}}/10</p>
          {{reservation.review.comment}}
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>



<!--  <p v-for="r in reservation.roomDtos" v-bind:key="r.id">{{r.name}}</p>-->
</template>

<script>
import helpers from "@/services/helpers";
import {mapState} from "vuex";
export default {
  data () {
     return {}
  },
  created () {
    this.$store.dispatch('reservationModule/fetchReservation', this.$route.params.id)
  },
  computed:mapState({
    reservation: state => state.reservationModule.reservation,

    inPast(){
     return new Date(this.reservation.checkOutDate) < new Date(Date.now())
    }
  }),
  methods: {
    ...helpers
  }
}
</script>

<style scoped>

</style>