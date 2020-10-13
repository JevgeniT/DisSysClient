<template>
    <div class="container-fluid" data-app>
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-8">
                        <h3>
                            <div class="text-left">
                                <v-chip
                                        class="ma-2"
                                        secondary
                                >
                                  {{ property.type }}
                                </v-chip>
                              {{ property.name }}
                              <v-subheader> <i class="fas fa-map-marker-alt"></i>
                                {{ property.address }}, {{ property.country }}</v-subheader>
                            </div>
                        </h3>
                      <h3>
                        About
                      </h3>
                      <blockquote class="blockquote">
                        <p class="mb-0">
                          {{property.description}}
                        </p>
                      </blockquote>
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                        <ol>
                            <li class="list-item">
                                Lorem ipsum dolor sit amet
                            </li>
                        </ol>
                    </div>
                    <div class="col-md-4">
                        <v-chip
                                class="ma-2"
                                color="primary"
                        >
                            10
                        </v-chip>
                        <p v-for="i in reviews" v-bind:key="i.id">
                            {{i.comment}}
                            <v-divider></v-divider>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <v-container id="ctr">
            <v-card max-width="100%"> <v-card-text>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="search.from"
                                    label="Check In"
                                    v-on="on"
                                    readonly
                                    clearable
                                    @click:clear="search.from = null"
                            ></v-text-field>
                        </template>
                        <v-date-picker no-title scrollable
                                v-model="search.from"
                                @change="menu1 = false"
                                :min="minCheckIn"
                        >
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    :value="search.to"
                                    clearable
                                    label="Check out"
                                    v-on="on"
                                    @click:clear="search.to = null"
                            ></v-text-field>
                        </template>
                        <v-date-picker no-title scrollable
                                v-model="search.to"
                                @change="menu2 = false"
                               :min="minCheckOut"
                        >
                            <v-spacer></v-spacer>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                            hide-details
                            :min="1"
                            single-line
                            type="number"
                            label="Guests"
                            v-model="search.adults"
                    />
                  <v-text-field
                      hide-details
                      :min="0"
                      single-line
                      type="number"
                      label="Child"
                      :value="0"
                      v-model="search.children"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-btn v-on:click="getDates"> Submit</v-btn>
                </v-col>
            </v-row></v-card-text>
            </v-card>
        </v-container>
      <v-col v-for="(room, x) in property.propertyRooms" v-bind:key="room.id" cols="12">
        <v-card>
          <div class="d-flex">
            <v-avatar class="ma-3" size="170" tile>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg"></v-img>
            </v-avatar>
             <v-card-text>
               <v-card-title class="headline">{{room.name}}</v-card-title>
                <v-list v-if="room.dates">
                  <v-list-item-group  v-model="reservation.roomDtos[x]">
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
                           <v-list-item-title >{{roomPrice(room.dates.pricePerNightForAdult, room.dates.pricePerNightForChild, room.policy[i].priceCoefficient)}}</v-list-item-title>
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
            <v-card-actions>
              <v-btn @click="submitReservation">Submit</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </div>
</template>
<script>
import helpers from "@/services/helpers";

export default {
  name: 'App',
  data: () => ({
    reservation: { roomDtos: []},
    menu1: false,
    modal: false,
    menu2: false,
    property: {
      propertyRooms:{}
    },
    search: {
      from: null,
      to: null,
      pId: null
    },
    days: null,
    reviews: null,
    dialog: false,
    pId: null,
  }),
  computed: {
    minCheckIn () {return helpers.minCheckIn(Date.now())},
    minCheckOut () {
      const dayOut = new Date(this.minCheckIn)
      const endDate = new Date(dayOut.getFullYear(), dayOut.getMonth(), dayOut.getDate() + 3)
      return endDate.toISOString().slice(0, 10)

    }
  },
  beforeMount () {
    this.getProperty()
    // this.GetReviews()
  },
  methods: {
    async getProperty () {
      this.pId = this.$route.params.id
      return await this.$api.property.byId(this.pId).then((r) => { this.property = r.data })
    },
    async getDates (){

      this.days = (new Date(this.search.to).getDate() - new Date(this.search.from).getDate())
      this.search.pId = this.$route.params.id
      return await this.$api.dates.check(this.search).then((r) => {
        if (r.status === 200) {
         this.$api.policies.all({ pId: this.pId }).then((r1) => {
            this.property.propertyRooms.forEach(x=>{
              x.policy  = r1.data
              x.dates = r.data.find(a => a.roomId === x.id)
             })
          })
          this.$forceUpdate() // TODO
        }
      })
    },
    async GetReviews () {
      const pId = this.$route.params.id
      return this.$api.review.all(pId).then((r) => { this.reviews = r.data })
    },
    async submitReservation () {
      this.reservation.propertyId = this.$route.params.id
      this.reservation.checkInDate = this.search.from
      this.reservation.checkOutDate = this.search.to
      this.reservation.roomDtos = this.reservation.roomDtos.filter(r=> r !== null)
      this.reservation.adults = Number(this.search.adults)
      this.reservation.children = Number(this.search.children)
       this.$api.reservations.post(JSON.stringify(this.reservation)).then(r => {
        if (r.status === 200) {
          console.log('ok')
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
      const days = new Date(this.search.to).getDate() - new Date(this.search.from).getDate()
      return (days *( adultPrice * this.search.adults + this.search.children * childPrice))  * coeff
    }
  }
}
</script>

<style scoped>
    .fname{
        font-size: .75rem;
        color: #008009;
    }
    #ctr{
        /*padding-bottom: 2px;*/
        margin-bottom: 10px;
        width: 100%;
        padding-right: 2px;
        padding-left: 2px;
    }
    #submit{
        margin-top: 10px;
    }
</style>
