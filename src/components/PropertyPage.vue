<template>
    <div class="container-fluid" data-app>
        <v-container >
          <v-row>
            <v-col md="12">
              <div class="text-left text-h4">
                <v-chip color="green" outlined>
                  {{ property.type }}
                </v-chip>
                  {{ property.name }}
                <v-subheader>
                  <v-icon color="red">mdi-star</v-icon>
                  <b>{{property.score}}</b>({{property.reviewsCount}})
                  <i class="fas fa-map-marker-alt" style="margin-left: 10px"></i>
                  <span style="font-size: 16px">
                     {{ property.address }}, {{ property.country }}
                   </span>
                </v-subheader>
              </div>
              <v-container>
              <v-row>
                <v-col md="6">
                  <v-img src="https://via.placeholder.com/455x350"></v-img>
                </v-col>
                <v-col md="6">
                  <v-row dense>
                    <v-col  cols="6">
                      <v-img src="https://via.placeholder.com/274x199"></v-img>
                    </v-col>
                    <v-col  cols="6">
                      <v-img src="https://via.placeholder.com/274x199"></v-img>
                    </v-col>
                    <v-col  cols="6">
                      <v-img src="https://via.placeholder.com/274x199"></v-img>
                    </v-col>
                    <v-col  cols="6">
                      <v-img src="https://via.placeholder.com/274x199"></v-img>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              </v-container>
              <v-divider></v-divider>
              <h5>About</h5>
              {{property.description}}
              <v-divider></v-divider>
              <h5>
                <v-icon color="red">mdi-star</v-icon>
                <b>{{property.score}}</b><span class="subtitle-2">({{postfix2(property.reviewsCount, 'Review')}})</span>
              </h5>
              <v-row dense>
                <v-col v-for="(r, i) in reviews" :key="r.id" cols="4" >
                  <v-card >
                    <v-card-title class="mt-8">
                      <v-avatar size="36" color="grey">
                      </v-avatar>
                      <p class="m-2">{{r.userName}}</p>
                    </v-card-title>
                    <v-card-subtitle>{{r.createdAt}}</v-card-subtitle>
                    <v-card-text>
                      <p v-if="!readMore && r.comment.length>80">{{r.comment.slice(0,65)}}
                       <a @click.self="SetReadMore">
                         more...
                       </a>
                      </p>
                      <p v-else>{{r.comment}}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <div class="stick">
            <search-component>
              <v-col style="padding-top: 2%">
                <v-btn @click="getDates" outlined text color="primary"> Submit</v-btn>
                <router-link v-if="roomDtos.length" :to="{name: 'reservationConfirm'}" ><v-btn text color="primary" @click="passToConfirmation" outlined>Reserve</v-btn></router-link>
              </v-col>
            </search-component>
          </div>

        </v-container>
      <v-col v-for="(room, x) in property.propertyRooms" v-bind:key="room.id">
        <v-card>
          <div class="d-flex">
            <v-avatar class="ma-3" size="170" tile>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
            </v-avatar>
             <v-card-text>
               <v-row dense >
                 <v-col cols="2">
                   <h4>{{room.name}}</h4>

                 </v-col>

               </v-row>
               <v-row dense>
                 <v-col cols="2">
                   <span style="color: green"><small>{{room.facilities.join(', ')}}</small></span>
                 </v-col>
                 <v-col>
                   <v-list v-if="room.dates">
                     <v-list-item-group  v-model="roomDtos[x]">
                       <template v-for="(item, i) in room.policy">
                         <v-divider
                             v-if="!item"
                             :key="`divider-${i}`"
                         ></v-divider>
                         <v-list-item
                             v-else
                             :key="`item-${i}`"
                             :value="setDto(room, room.policy[i])"
                             active-class="deep-purple--text text--accent-4">
                           <template v-slot:default="{ active }">
                             <v-list-item-content>

                               <v-row>
                                 <v-col>
                                   2 adults 1 child
                                 </v-col>
                                 <v-col>
                                   {{roomPrice(room.dates.pricePerNightForAdult, room.dates.pricePerNightForChild, room.policy[i].priceCoefficient)}}
                                 </v-col>
                               </v-row>
                             </v-list-item-content>
                             <v-list-item-action>
                               <v-checkbox
                                   :input-value="active"
                                   color="deep-purple accent-4"
                               ></v-checkbox>
                             </v-list-item-action>
                           </template>
                         </v-list-item>
                       </template>
                     </v-list-item-group>
                   </v-list>
                 </v-col>
               </v-row>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    <v-col>
      <v-card v-if="property.propertyRules">
        <v-card-title>House Rules</v-card-title>
        <v-card-text>
          <v-list >
            <v-list-item-group>
              <v-list-item>
                <v-col cols="2">
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>Check-in
                  </v-list-item-icon>
                </v-col>
                <v-col cols="4" offset-sm="1">
<!--                  <v-tooltip right>-->
<!--                    <template v-slot:activator="{ attrs }">-->
<!--                      <v-btn-->
<!--                          color="primary"-->
<!--                          outlined-->
<!--                          dark-->
<!--                          x-small-->
<!--                          v-bind="attrs"-->
<!--                      >-->
<!--                        From {{property.propertyRules.checkInFrom}}-->
<!--                      </v-btn>-->
<!--                    </template>-->
<!--                  </v-tooltip>-->
                   <v-progress-linear
                      color="light-blue"
                      height="20"
                      :value="40"
                      rounded
                      striped
                      reverse
                  ></v-progress-linear>
                 </v-col>
              </v-list-item>
              <v-list-item>
                <v-col cols="2">
                  <v-list-item-icon>
                    <v-icon>mdi-calendar</v-icon>Check-out
                  </v-list-item-icon>
                </v-col>
                <v-col cols="4" offset-sm="1">

                  <v-progress-linear
                      color="light-blue"
                      height="20"
                      :value="40"
                      rounded
                      striped
                  ></v-progress-linear>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-col md="3">
                  <v-list-item-icon>
                  <span>
                    <v-icon>mdi-paw</v-icon>
                    Pets
                  </span>
                  </v-list-item-icon>
                </v-col>
                <v-col md="11">
                  <v-list-item-content>
                    {{property.propertyRules.allowPets?'Pets are allowed':'Pets are not allowed'}}
                  </v-list-item-content>
                </v-col>
              </v-list-item>

              <v-list-item>
                <v-col md="3">
                  <v-list-item-icon>
                  <span>
                    <v-icon>mdi-account</v-icon>
                    Age restriction
                  </span>
                  </v-list-item-icon>
                </v-col>
               <v-col md="9">
                 <v-list-item-content >
                   {{property.propertyRules.checkInAge>0?'':'There\'\s no age requirement for check-in'}}
                 </v-list-item-content>
               </v-col>
              </v-list-item>

              <v-list-item>
                <v-col md="3">
                  <v-list-item-icon>
                  <span>
                    <v-icon>mdi-party-popper</v-icon>
                    Parties
                  </span>
                  </v-list-item-icon>
                </v-col>
               <v-col md="10">
                 <v-list-item-content>
                   {{property.propertyRules.allowParties?'Parties are allowed':'Parties/events are not allowed'}}
                 </v-list-item-content>
               </v-col>
              </v-list-item>
              <v-list-item>
                <v-col cols="3">
                  <v-list-item-icon>
                  <span>
                    <v-icon>mdi-lock</v-icon>
                    Damage deposit
                  </span>
                  </v-list-item-icon>
                </v-col>
                <v-col cols="6">
                  <v-list-item-content v-if="property.propertyRules.damageDepositReuqired">
                    A damage deposit of {{property.propertyRules.damageDeposit}} is required on arrival.You should be reimbursed on check-out.
                    Your deposit will be refunded in full, in cash, subject to an inspection of the property.
                  </v-list-item-content>
                  <v-list-item-content v-else>
                    No damage deposit required
                  </v-list-item-content>
                </v-col>
              </v-list-item>
              <v-list-item>
                <v-col cols="3">
                  <v-list-item-icon>
                    <v-icon>mdi-credit-card</v-icon>
                    Payment methods accepted
                  </v-list-item-icon>
                </v-col>
                <v-col cols="5">
                  <v-list-item-content>
                          {{property.propertyRules.paymentMethodsAccepted.join(', ')}}
                   </v-list-item-content>
                </v-col>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    </div>
</template>
<script>
import SearchComponent from "@/components/SearchComponent";
import {Reservation, ReservationDto} from '@/types/Reservation';
import currency from 'currency.js'
import helpers from "@/services/helpers";

export default {
  name: 'App',
  components: {SearchComponent},
  data: () => ({
    reservation: {},
    roomDtos: [],
    readMore: false,
    property: {
      propertyRooms:[]
    },
    request: {},
    days: null,
    reviews: null,
    pId: null,
    dialog: false
  }),
  beforeMount () {
    this.getProperty()
    this.GetReviews()
  },
  methods: {
    ...helpers,
    async getProperty () {
      this.pId = this.$route.params.id
      return await this.$api.property.byId(this.pId).then((r) => { this.property = r.data })
    },
    async getDates (){
      this.request = this.$store.getters["searchModule/getRawRequest"];
      this.request.pId = this.$route.params.id
      this.days = (new Date(this.request.to).getDate() - new Date(this.request.from).getDate())

      return await this.$api.dates.check(this.request).then((r) => {
        if (r.status === 200) {
           this.$api.policies.all({ pId: this.pId }).then((r1) => {
            this.property.propertyRooms.forEach(x=>{
              x.policy  = r1.data
              x.dates = r.data.find(a => a.roomId === x.id)
            })
             this.$forceUpdate()
          })
        }
      })
    },
    async GetReviews () {
      const pId = this.$route.params.id
      return await this.$api.review.all({pId: pId}).then((r) => {this.reviews = r.data})
    },
    setDto(room, policy){
      const found = this.property.propertyRooms.find(x=> x.id === room.id && x.policy.find(p=> p.id === policy.id))
      const a = found.dates.pricePerNightForAdult
      const ch = found.dates.pricePerNightForChild
      const c = found.policy.filter(p=> p.id === policy.id)[0].priceCoefficient
      return {room: room, policy: policy, roomTotalPrice : this.roomPrice(a, ch, c)}
    },
    roomPrice(adultPrice, childPrice, coeff) {
      const days = new Date(this.request.to).getDate() - new Date(this.request.from).getDate()
      const totalPerNight = days *(adultPrice * this.request.adults + this.request.children * childPrice);
      return currency((totalPerNight  * (coeff / 100)) + totalPerNight)
    },
    SetReadMore(){
      this.readMore = true;
    },
    passToConfirmation(){
      this.reservation = new ReservationDto(this.request)
      this.reservation.property = this.property
      this.reservation.roomDtos = this.roomDtos.filter(r=> r !== null)
      this.$store.commit('reservationModule/setReservation', this.reservation)
    }
  }
}
</script>

<style scoped>
.stick {
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
}
</style>
