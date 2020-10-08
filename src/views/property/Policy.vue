<template>
<v-container>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header >
        Create
        <template v-slot:actions>
          <v-icon color="teal">mdi-plus</v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field label="Policy title" v-model="policy.name"></v-text-field>
        <v-text-field label="Require prepayment in" v-model.number="policy.prepaymentBefore" suffix="days before check in"></v-text-field>
        <v-text-field label="%" v-model.number="policy.priceCoefficient" suffix="coefficient"></v-text-field>
        <v-text-field label="Guest can cancel reservation free of charge " v-model.number="policy.cancellationBefore" suffix="before check in"></v-text-field>
        <v-btn text color="primary" outlined @click="postPolicy">Create</v-btn>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-for="p in policies" :key="p.id">
      <v-expansion-panel-header>{{p.name}}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>Guest can cancel reservation {{p.cancellationBefore}} days before check in</p>
        <p>Prepayment should be paid {{p.prepaymentBefore}} days before check in
        <p>{{p.priceCoefficient}} %</p>

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
      // policies: {},
      policy: {}
    }
  },
  beforeMount () {
    // this.getPolicies()
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
      await this.$api.policies.post(JSON.stringify(this.policy)).then((r) => {
        if (r.status === 201) {
          this.policies.push(r.data)
        }
      })
    }
  }
}
</script>
