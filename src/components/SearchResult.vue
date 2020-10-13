<template>
    <div id="app">
        <v-form @submit.prevent="searchRequest">
            <v-container>
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
                                        v-model="dateRangeText"
                                        label="Check In"
                                        prepend-icon="mdi-calendar"
                                        v-on="on"
                                        readonly
                                        clearable
                                        @click:clear="request.from = null"
                                ></v-text-field>
                            </template>
                            <v-date-picker no-title scrollable
                                           range
                                           v-model="dates"
                                           :min="minCheckIn"
                                           @change="menu1 = false"
                            >
                            </v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                       <v-menu bottom offset-y :close-on-content-click="closeOnClick">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              :label="guests"
                              v-bind="attrs"
                              v-on="on"
                          >
                          </v-text-field>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-title>Adults</v-list-item-title>
                            <v-icon @click="request.adults>0?request.adults--:request.adults" >mdi-minus</v-icon>
                            {{request.adults}}
                            <v-icon @click="request.adults++" >mdi-plus</v-icon>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>Children</v-list-item-title>
                            <v-icon @click="request.children>0?request.children--:request.children">mdi-minus</v-icon>
                            {{request.children}}
                            <v-icon @click="request.children++">mdi-plus</v-icon>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field v-model="request.input" label="Destination" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-btn type="submit" id="submit" v-on:click="searchRequest">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <div class="row">
        <div class="col-md-12">
            <div class="row">
            <div class="col-md-2">
                <v-card outlined v-if="data.length>0">
                    <v-card-title>
                        Filter by:
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-checkbox v-model="selected" value="Hotel" class="mx-2" label="Hotel"></v-checkbox>
                        <v-checkbox v-model="selected" value="Apartments" class="mx-2" label="Apartments"></v-checkbox>
                        <v-checkbox v-model="selected" :value="data.score" class="mx-2" label="6+"></v-checkbox>
                        <v-checkbox v-model="selected" value="7" class="mx-2" label="7+"></v-checkbox>
                    </v-card-text>
                </v-card>
            </div>
        <div class="col-md-10"> <!-- main card  -->

            <v-card v-if="data.length===0">
               <v-list-item-content style="text-align: center">
                   <p>Sorry, nothing has been found</p>
               </v-list-item-content>
           </v-card>
           <v-card v-for="d in filtered"  v-bind:key="d.id" class="mx-auto" outlined style="margin-bottom: 5px">
               <v-list-item three-line>
               <v-list-item-avatar tile size="150" color="grey">
                   <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
               </v-list-item-avatar>
                   <v-row dense class="card-row">
                    <v-list-item-content>
                       <v-list-item-title class="headline mb-2">
                               <v-chip color="green" outlined small>{{d.type}}</v-chip><h4 style="display: inline; padding-left: 4px">{{d.name}}</h4>
                       </v-list-item-title>
                       <v-list-item-subtitle> {{d.country}}, {{d.address}} </v-list-item-subtitle>
                   </v-list-item-content>
                      <v-col justify="end">
                          <v-row justify="end" align="center" v-if="d.score>0">
                              <div class="scoreBox">{{d.score}}</div>
                              <div style="line-height: 70%">
                                  <h6>{{getScore(d.score)}}</h6>
                                  <p style="color: #a0a5b1">{{d.reviewsCount}} reviews</p>
                              </div>
                          </v-row>
                          <v-row justify="end">
                              <v-btn text id="checkbutton" color="primary" outlined><router-link :to="{name:'propertyInfo', params:{id: d.id}}">Select room </router-link></v-btn>
                          </v-row>
                      </v-col>
                   </v-row>
               <v-card-actions>
               </v-card-actions>
               </v-list-item>
           </v-card>
      </div> <!-- main card end  -->
        </div>
        </div>
        </div>

    </div>
</template>
<script>
import helpers from "@/services/helpers";

export default {
  name: 'SearchResult',
  data () {
    return {
      request: {
        adults: 1,
        children: 0
      },
      data: {},
      menu1: false,
      score: '',
      selected: [],
      closeOnClick: false,
      dates: []
    }
  },
  computed: {
    guests () {
      return `Adults ${this.request.adults} Children ${this.request.children}`
    },
    dateRangeText () { // TODO make input larger
      return this.dates.length>1?`${helpers.utcDates(this.dates[0])} - ${helpers.utcDates(this.dates[1])}`:`Check-in - Check-out`
    },
    filtered: function () {
      if (!this.selected.length) {
        return this.data
      }
      return this.data.filter(p => this.selected.includes(p.type || p.score))
    },
    minCheckIn () {
      return helpers.minCheckIn(Date.now())
    }
  },
  beforeMount () {
  },
  methods: {
    async searchRequest () {
      this.request.from = this.dates[0]
      this.request.to  = this.dates[1]
      return await this.$api.property.find(this.request).then((r) => { this.data = r.data })
    },
    getScore (value) {
      const scoreMap = new Map([[6, 'Pleasant'], [7, 'Good'], [8, 'Very good'], [9, 'Wonderful']])
      return scoreMap.get(Math.round(value))
    }
  }
}
</script>
<style>
    .card-row{
        padding: 20px;
        margin-bottom: 56px;
    }
    #checkbutton{
        margin-right: 10px;
    }
    .scoreBox{
        float: left;
        margin-right: 1rem;
        margin-bottom: 5px;
        background: #76a7d7;
        color: #fff;
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
</style>
