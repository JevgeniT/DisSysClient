<template>
<v-container>
  <v-expansion-panels class="elevation-0">
    <v-expansion-panel>
      <v-expansion-panel-header>
          <template v-slot:actions>
            <v-icon color="teal" class="icon">mdi-plus</v-icon>
          </template>
        <span class="header"></span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="12" sm="6"><v-text-field label="Policy title" v-model="policy.name"></v-text-field></v-col>
          <v-col cols="12" sm="6">
            <v-select label="Require prepayment in" v-model.number="policy.prepaymentBefore" :items="daysBefore" suffix="days before check in"></v-select>
          </v-col>
          <v-col cols="6" sm="6"><v-text-field label="%" v-model.number="policy.priceCoefficient"></v-text-field>
            <v-radio-group row v-model="higherLower">
              <v-radio label="lower" value="lower"></v-radio>
              <v-radio label="higher" value="higher"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6" sm="6"><v-select label="How long before arrival can the guest cancel free of charge?"
                    :items="daysBefore" v-model.number="policy.cancellationBefore"></v-select></v-col>
          <v-col cols="12" sm="6">
           <v-btn text color="primary" outlined @click="postPolicy">Create</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider></v-divider>
    <v-expansion-panel v-for="p in policies" :key="p.id">
      <v-expansion-panel-header>{{p.name}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Guest can cancel reservation {{p.cancellationBefore}} days before check in</p>
        <p>Prepayment should be paid {{p.prepaymentBefore}} days before check in
        <p>{{p.priceCoefficient}} %</p>
        <v-divider></v-divider>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'policy',
  data () {
    return {
      policy: {},
      daysBefore:[1,2,3,5,7,14,30,42,60],
      higherLower: null
    }
  },
  beforeMount () {
   },
  created () {
    this.$store.dispatch('policyModule/loadData', this.$route.params.id)
  },
  computed: mapState({
    policies: state => state.policyModule.policies
  }),
  methods: {
    async postPolicy () {
      this.policy.propertyId = this.$route.params.id
        if (this.higherLower === ('lower')){
         this.policy.priceCoefficient *= -1;
       }
       await this.$api.policies.post(JSON.stringify(this.policy)).then((r) => {
        if (r.status === 201) {
          this.policies.push(r.data)
        }
      })
    }
  }
}
</script>
<style scoped>
.v-expansion-panel::before {
  box-shadow: none;
}
.icon{
  order: 0;
}
.header{
  order: 1;
}
</style>
