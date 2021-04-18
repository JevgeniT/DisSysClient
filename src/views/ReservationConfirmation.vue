<template>
<v-container>
  <v-row>
  <v-col cols="3">
    <v-card>
      <v-card-title style="background-color: #e7e7e7">
        Your booking details
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <p>Check-in</p>
            <p class="font-weight-bold">{{dateString(reservation.checkInDate)}}</p>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <p>Check-out</p>
            <p class="font-weight-bold">{{dateString(reservation.checkOutDate)}}</p>
          </v-col>
         </v-row>
        <v-divider style="margin-top: 0"></v-divider>
        <v-row>
          <v-col style="padding-top: 0">
            <p>Total length of stay:</p>
            <b>{{getDates}} {{postfix(getDates,'night')}}</b>
          </v-col>
        </v-row>
        <v-divider style="margin-top: 1px; margin-bottom: 0"></v-divider>
        <v-row>
          <v-col>
            <p>You selected:</p>
            <p v-for="r in reservation.roomDtos" v-bind:key="r.id">
              <b>{{r.room.name}}</b>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card style="margin-top: 10px">
      <v-card-title style="background-color: #e7e7e7">
        Your price summary
      </v-card-title>
      <v-card-text style="padding: 15px">
        <p><b>{{reservation.roomDtos.length}}</b> {{postfix(reservation.roomDtos.length, 'room')}}
          <span class="pull-right"><b>{{reservation.roomDtos[0].roomTotalPrice}}</b></span></p>
          <p v-for="e in reservation.extras" v-bind:key="e.id">{{e.name}}<span class="pull-right"><b>{{e.price}}</b></span></p>
        <v-divider></v-divider>
          <span class="subtitle-1">Final price
              <span class="pull-right font-weight-bold">{{totalPrice}}</span>
          </span>
      </v-card-text>
    </v-card>
    <v-card style="margin-top: 10px">
      <v-card-title style="background-color: #e7e7e7">
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="space-around" style="margin-top: 10px">
            <v-btn @click="submitReservation" color="primary" outlined>Reserve</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
    <v-col cols="9">
      <v-card elevation="1">
        <div class="d-flex">
          <v-avatar  class="ma-3" size="150" tile>
            <v-img src="https://via.placeholder.com/150"
            ></v-img>
          </v-avatar>
          <v-card-text>
            <v-card-title>
              <router-link :to="{name:'PropertyOwnerInfo', params:{id: reservation.property.id}}">{{reservation.property.name}}</router-link>
            </v-card-title>
            <v-card-subtitle>{{reservation.property.address}}, {{reservation.property.country}}</v-card-subtitle>
          </v-card-text>
        </div>
      </v-card>
      <v-card v-for="(r, i) in reservation.roomDtos" v-bind:key="r.id" style="margin-top: 10px">

            <v-card-title>{{r.room.name}}
              <v-spacer></v-spacer>
              <v-icon v-if="reservation.roomDtos.length>1" @click="reservation.roomDtos.splice(i,1)">mdi-close</v-icon>
            </v-card-title>
            <v-card-subtitle>
              <span v-for="f in r.room.facilities"><v-chip outlined color="green" label x-small>{{f}}</v-chip></span>
            </v-card-subtitle>
            <v-card-text>
              <v-radio-group dense label="Select your bed:" v-model="r.bedType" >
                <v-radio v-for="(b, i) in r.room.bedTypes" :label="b"  :value="b" v-bind:key="i">
                </v-radio>
              </v-radio-group>
            <v-col sm="4">
              <v-text-field dense  outlined
                  label="Guest first and last name"
                  v-model="r.guestFirstLastName"
                  placeholder="First name, Last name"
              ></v-text-field>
            </v-col>
          </v-card-text>
      </v-card>
      <v-card style="margin-top: 10px" elevation="1">
        <v-card-title>
          Special Requests
        </v-card-title>
        <v-card-text>
         <p> Type your requests here – we'll share them with the property.</p>
         <p> Special requests cannot be guaranteed – but the property will do its best to meet your needs.</p>
          <v-textarea outlined dense v-model="reservation.message">
          </v-textarea>
          <v-divider></v-divider>
          <h6> <b> Let the property know when you plan to arrive (optional)</b> </h6>
          <p>  You might hear back from the property about your arrival time.</p>
          <v-row dense>
            <span style="padding-left: 15px; padding-top: 10px">Arrival time: {{reservation.checkInDate}}</span>
              <v-col cols="4">
                <v-select outlined dense v-model="reservation.arrivalTime" :items="checkInTimes"></v-select>
              </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card elevation="1" style="margin-top: 10px">
        <v-card-title>Additional service</v-card-title>
        <v-card-text>
          <v-col>
            <v-list>
              <v-list-item-group   active-class="">
                <v-list-item v-for="e in reservation.property.extras">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title>{{e.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{e.price}}</v-list-item-subtitle>
                    </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox :input-value="active"
                                v-model="reservation.extras" dense
                                v-bind:key="e.id"
                                :value="e">
                    </v-checkbox>
                  </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-card-text>
      </v-card>
     </v-col>
  </v-row>
</v-container>
</template>

<script>
import helpers from "@/services/helpers";
import { Reservation } from "@/types/Reservation";
import currency from "currency.js";

export default {
name: "ReservationConfirmation",
  data() {
    return {
      reservation : {}
    }
  },
  created() {
    this.reservation = this.$store.getters["reservationModule/getReservation"]
     },
  computed:{
    totalPrice() {
      let total = 0;
      this.reservation.extras.map( e=> {
         total += e.price
      })
       this.reservation.roomDtos.map(r=>{
            total+=r.roomTotalPrice.value
        })
       return currency(total);
    },
    getDates(){
     return  helpers.getTotalDays(this.reservation.checkInDate, this.reservation.checkOutDate)
    },
    checkInTimes() {
      let times = ['I don\'t know']
      for (let i = 0; i < 24; i++) {
        let from = i <= 9? `0${i}:00` : `${i}:00`
        let to = i+1 < 10? `0${i+1}:00` : `${i+1}:00`
        if (i+1 === 24){
          to = '00:00'
        }
        times.push(`${from} - ${to}`)
      }
      return times;
    }
  },
  methods :{
    async submitReservation () {
      this.reservation.totalPrice = this.totalPrice;
      const r = new Reservation(this.reservation)
      await this.$api.reservations.post(JSON.stringify(r)).then(r => {
        if (r.status === 201) {
          this.$router.push('/reservation/'+r.data.id)
        }
      })
    },
    postfix(n, w){
      return helpers.postfix(n,w)
    },
    dateString(date){
      return new Date(date).toDateString()
    }
  }
}
</script>

<style scoped>
</style>