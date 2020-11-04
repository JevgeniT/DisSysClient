<template>
  <v-card >
    <v-row class="d-flex">
      <v-col md="4" style="margin-left: 10px">
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

      <v-col >
        <v-menu bottom offset-y :close-on-content-click="closeOnClick">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :label="guests"
                prepend-icon="mdi-account-group"
                v-bind="attrs"
                v-on="on"
            >
            </v-text-field>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Adults</v-list-item-title>
              <v-icon @click="request.adults>1?request.adults--:request.adults" >mdi-minus</v-icon>
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
      <slot></slot>
    </v-row>
  </v-card>

</template>

<script>
import helpers from "@/services/helpers";

export default {
  name: "SearchComponent",
  data() {
    return {
      request: {
        adults: 1,
        children: 0
      },
      menu1: false,
      score: '',
      selected: [],
      closeOnClick: false,
      dates: []
    }
  },
  watch:{
    dates: function () {
      this.request.from = this.dates[0]
      this.request.to = this.dates[1]
      this.$store.commit('searchModule/setRequest',this.request)
    }
  },
  computed: {
    getResponse() {
      return this.$store.getters["searchModule/getResponse"]
    },
    guests () {
      return `Adults ${this.request.adults} Children ${this.request.children}`
    },
    dateRangeText () {
       return this.dates.length>1?`${helpers.utcDates(this.dates[0])} - ${helpers.utcDates(this.dates[1])}`:`Check-in - Check-out`
    },
    minCheckIn () {
      return helpers.minCheckIn(Date.now())
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>