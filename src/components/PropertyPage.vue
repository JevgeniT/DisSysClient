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
              <v-row >
                <v-col lg="6" >
                  <v-img src="https://via.placeholder.com/450x350"></v-img>
                </v-col>
                <v-col lg="3" md="6">
                  <v-row style="padding: 2px" >
                    <v-img src="https://via.placeholder.com/274x199"></v-img>
                    <v-img src="https://via.placeholder.com/274x199"></v-img>
                  </v-row>
                </v-col>
                <v-col lg="3" md="6">
                  <v-row style="padding: 2px 2px" align-content="space-around">
                    <v-img src="https://via.placeholder.com/274x199"></v-img>
                    <v-img src="https://via.placeholder.com/274x199"></v-img>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <h5>About</h5>
              {{property.description}}
              <v-divider></v-divider>
              <h5>
                <v-icon color="red">mdi-star</v-icon>
                <b>{{property.score}}</b>({{property.reviewsCount}} Review(s))
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
          <search-component >
            <v-col style="padding-top: 2%">
                <v-btn @click="getDates"> Submit</v-btn>
                <v-btn v-if="roomDtos.length" @click="submitReservation" text color="green" outlined>Submit</v-btn>
            </v-col>
          </search-component>
        </v-container>
      <v-col v-for="(room, x) in property.propertyRooms" v-bind:key="room.id">
        <v-card>
          <div class="d-flex">
            <v-avatar class="ma-3" size="170" tile>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
            </v-avatar>
             <v-card-text>
               <v-card-title class="headline">{{room.name}}</v-card-title>
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
                         :value="setDto(room.id, room.policy[i].id)"
                         active-class="deep-purple--text text--accent-4">
                       <template v-slot:default="{ active }">
                         <v-list-item-content>
                           <v-list-item-title >
                             {{roomPrice(room.dates.pricePerNightForAdult, room.dates.pricePerNightForChild, room.policy[i].priceCoefficient)}}
                           </v-list-item-title>
                           <v-list-item-subtitle v-text="item.name">random text </v-list-item-subtitle>
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
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </div>
</template>
<script>
import SearchComponent from "@/components/SearchComponent";
import {Reservation} from '@/types/Reservation';
import currency from 'currency.js'

export default {
  name: 'App',
  components: {SearchComponent},
  data: () => ({
    reservation: new Reservation({}),
    roomDtos: [],
    readMore: false,
    menu1: false,
    menu2: false,
    property: {
      propertyRooms:{}
    },
    request: {},
    days: null,
    reviews: null,
    pId: null
  }),
  computed: {
  },
  beforeMount () {
    this.getProperty()
    this.GetReviews()
  },
  methods: {
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
          })
          this.$forceUpdate()
        }
      })
    },
    async GetReviews () {
      const pId = this.$route.params.id
      return this.$api.review.all({pId: pId}).then((r) => {this.reviews = r.data})
    },
    async submitReservation () { // todo
      this.reservation = new Reservation(this.request)
      this.reservation.roomDtos = this.roomDtos.filter(r=> r !== null)
       this.$api.reservations.post(JSON.stringify(this.reservation)).then(r => {
        if (r.status === 201) {
          this.$router.push('/reservation/'+r.data.id)
        }
      })
    },
    setDto(rId, pId){
      const found = this.property.propertyRooms.find(x=> x.id === rId && x.policy.find(p=> p.id === pId))
      const a = found.dates.pricePerNightForAdult
      const c = found.policy.filter(p=> p.id === pId)[0].priceCoefficient
      return {roomId: rId, policyId: pId, roomTotalPrice: this.roomPrice(a,0,c)}
    },
    roomPrice(adultPrice, childPrice, coeff) {
      const days = new Date(this.request.to).getDate() - new Date(this.request.from).getDate()
      return currency((days *( adultPrice * this.request.adults + this.request.children * childPrice))  * coeff)
     },
    SetReadMore(){
      this.readMore = true;
    }
  }
}
</script>

<style scoped>
</style>
