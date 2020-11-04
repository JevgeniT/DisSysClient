<template>
<v-container>
  <h6>Reservation number {{reservation.reservationNumber}}</h6>

         <v-rating
            empty-icon="mdi-star-outline"
            color="yellow darken-3"
            full-icon="mdi-star"
            v-model="review.score"
            length="10"
            size="24"
        ></v-rating>
        <v-textarea solo v-model="review.comment">
        </v-textarea>
      <v-btn text outlined color="green" @click="postReview">Submit</v-btn>
</v-container>
</template>

<script>
export default {
name: "Review",
  data: () => {
    return {
      review: {}
  }},
  computed: {
    reservation(){
      return this.$store.getters["reservationModule/getReservation"]
    }
  },
  methods: {
    async postReview() {
      this.review.reservationId = this.reservation.id
      this.review.propertyId = this.reservation.propertyId
      await this.$api.review.post(this.review).then((r)=>{
        console.log(r.status)
      })
    }
  }
}
</script>

<style scoped>

</style>