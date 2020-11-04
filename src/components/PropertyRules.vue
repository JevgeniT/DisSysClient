<template>
<v-container>
  <v-row>
    <v-col
        cols="12"
        sm="6"
    >
      <v-checkbox
      label="Require damage deposit"
      v-model="rules.damageDepositRequired">
      </v-checkbox>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
          :disabled="rules.damageDepositRequired===false"
          label="Damage deposit"
          prefix="$"
          v-model.number="rules.damageDeposit">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-select
          label="Payment methods accepted"
          :items="payment"
          v-model="rules.paymentMethodsAccepted"
      >
      </v-select>
    </v-col>

       <v-row justify="space-around">
        <v-checkbox label="Allow pets" v-model="rules.allowPets"></v-checkbox>
        <v-checkbox label="Allow parties" v-model="rules.allowParties"></v-checkbox>
       </v-row>


<!--    <v-col cols="12" sm="6">-->

<!--    </v-col>-->

   <v-col cols="12" sm="4">  <v-text-field label="Check in start" type="time" v-model="rules.checkInFrom"></v-text-field> </v-col>
   <v-col cols="12" sm="4">  <v-text-field label="Check in end" type="time" v-model="rules.checkInTo"></v-text-field> </v-col>
   <v-col cols="12" sm="4">  <v-text-field label="Check out before" type="time" v-model="rules.checkOutBefore"></v-text-field> </v-col>
   <v-col cols="12" sm="4">  <v-btn text color="primary" outlined @click="createRules">Save</v-btn> </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
name: "PropertyRules",
  data() {
    return {
      rules: {},
      payment: ['Cash','Visa','MasterCard']
    }
  },
  beforeMount (){
    this.getRules();
  },
  methods: {
    async getRules () {
      return await this.$api.rules.byId(this.$route.params.id)
          .then((r) => {if (r.status === 200){
            this.rules = r.data
          }})
    },
    async createRules () {
      this.rules.Id = this.$route.params.id
      await this.$api.rules.post(JSON.stringify(this.rules))
    }
  }
}
</script>

<style scoped>

</style>