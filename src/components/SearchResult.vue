<template>
    <v-container fluid>
         <search-component>
          <v-col cols="12" sm="6" md="3">
              <v-text-field prepend-icon="mdi-map-marker" v-model="input" label="Destination" ></v-text-field>
          </v-col>
          <v-col style="padding-top: 2%">
              <v-btn v-on:click="searchRequest" outlined  color="primary">Submit</v-btn>
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
                    <v-divider class="m-0"></v-divider>
                    <v-card-text >
                        <v-checkbox v-model="selected" value="Hotel" class="mx-1 mt-0" label="Hotel"></v-checkbox>
                        <v-checkbox v-model="selected" value="Apartments" class="mx-1 mt-0" label="Apartments"></v-checkbox>
                        <v-checkbox v-model="selected" :value="response.score" class="mx-1 mt-0" label="6+"></v-checkbox>
                        <v-checkbox v-model="selected" value="7" class="mx-1 mt-0" label="7+"></v-checkbox>
                    </v-card-text>
                </v-card>
           </v-col>
           <v-col md="12" v-if="response.notFound">
           <v-card>
               <v-list-item-content style="text-align: center">
                   <p class="pt-1">Sorry, nothing has been found</p>
               </v-list-item-content>
           </v-card>
           </v-col>
           <v-col v-else>
           <v-card v-for="d in filtered"  v-bind:key="d.id" class="mx-auto" outlined style="margin-bottom: 5px">
               <v-list-item three-line>
               <v-list-item-avatar tile size="150" color="grey">
                   <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
               </v-list-item-avatar>
                   <v-row dense class="card-row">
                    <v-list-item-content>
                       <v-list-item-title class="headline mb-2">
                         <v-chip color="green" outlined small>{{d.type}}</v-chip>
                         <h4 style="display: inline; padding-left: 4px">
                           <router-link :to="{name:'propertyInfo', params:{id: d.id}}">{{d.name}}</router-link>
                         </h4>
                       </v-list-item-title>
                       <v-list-item-subtitle><v-icon>mdi-map-marker</v-icon> {{d.country}}, {{d.address}}</v-list-item-subtitle>
                         <v-col justify="start" v-if="d.room">
                             <b>{{d.room.name}}</b>
                             <div class="pull-right" style="word-wrap: break-word;">
                               {{d.room.price}}
                               <span style="font-size: 10px" >1 day</span>
                             </div>
                         </v-col>
                   </v-list-item-content>
                      <v-col justify="end" v-if="d.score>0">
                          <v-row justify="end" align="center" v-if="d.score>0">
                              <div class="scoreBox">{{d.score}}</div>
                              <div style="line-height: 70%">
                                  <h6>{{getScore(d.score)}}</h6>
                                  <p style="color: #a0a5b1">{{d.reviewsCount}} reviews</p>
                              </div>
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
      score: '',
      selected: [],
      input: ''
    }
  },
  computed: {
    ...mapState({
      response : state =>  state.searchModule.response
    }),
    filtered: function () {
         return !this.selected.length ? this.response :  this.response.filter(p => this.selected.includes(p.type || p.score))
     }
  },
  methods: {
    async searchRequest () {
      const request = this.$store.getters["searchModule/getRawRequest"]
      request.input  = this.input
      return await this.$store.dispatch('searchModule/findProperties', request)
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
        background: #5597e2;
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
