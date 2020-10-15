<template>
    <v-container fluid>
        <search-component>
          <v-col cols="12" sm="6" md="3">
              <v-text-field prepend-icon="mdi-map-marker" v-model="request.input" label="Destination" required></v-text-field>
          </v-col>
          <v-col style="padding-top: 2%">
              <v-btn type="submit" id="submit" v-on:click="searchRequest">Submit</v-btn>
          </v-col>
        </search-component>
        <v-row>
        <v-col cols="12">
            <v-row>
            <v-col md="2">
                <v-card outlined v-if="!response.notFound && response.length">
                    <v-card-title>
                        Filter by:
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-checkbox v-model="selected" value="Hotel" class="mx-2" label="Hotel"></v-checkbox>
                        <v-checkbox v-model="selected" value="Apartments" class="mx-2" label="Apartments"></v-checkbox>
                        <v-checkbox v-model="selected" :value="response.score" class="mx-2" label="6+"></v-checkbox>
                        <v-checkbox v-model="selected" value="7" class="mx-2" label="7+"></v-checkbox>
                    </v-card-text>
                </v-card>
           </v-col>
           <v-col md="10">
           <v-card v-if="response.notFound">
               <v-list-item-content style="text-align: center">
                   <p>Sorry, nothing has been found</p>
               </v-list-item-content>
           </v-card>
           <v-card v-else v-for="d in filtered"  v-bind:key="d.id" class="mx-auto" outlined style="margin-bottom: 5px">
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
                              <v-btn text id="checkbutton" color="primary" outlined :to="{name:'propertyInfo', params:{id: d.id}}">Check</v-btn>
                          </v-row>
                      </v-col>
                   </v-row>
               <v-card-actions>
               </v-card-actions>
               </v-list-item>
           </v-card>
              </v-col>
        </v-row>
        </v-col>
        </v-row>
    </v-container>
</template>
<script>
import SearchComponent from "@/components/SearchComponent";
import {mapState} from "vuex";
export default {
  name: 'SearchResult',
  components: {SearchComponent},
  data () {
    return {
      request: {
        adults: 1,
        children: 0
      },
      score: '',
      selected: [],
      dates: []
    }
  },
  computed: {
    ...mapState({
      response : state =>  state.searchModule.response
    }),
    filtered: function () {
         return !this.selected.length ? this.response : this.response.filter(p => this.selected.includes(p.type || p.score))
     },
  },
  methods: {
    async searchRequest () {
      this.request.from = this.dates[0]
      this.request.to  = this.dates[1]
      return await this.$store.dispatch('searchModule/findProperties',this.request)
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
