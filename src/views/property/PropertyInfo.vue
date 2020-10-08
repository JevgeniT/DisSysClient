<template>
    <div class="container">
     <v-card v-model="getProperty" >
       <v-img src="https://cdn.vuetifyjs.com/images/cards/house.jpg" height="200px"></v-img>
        <v-card-title>{{property.name}}</v-card-title>
        <v-card-subtitle>{{property.country}}, {{property.address}}</v-card-subtitle>
        <v-card-text>
        </v-card-text>
    </v-card>
      <PropertyNav/>
        <v-spacer></v-spacer>
    </div>
</template>

<script>
import PropertyNav from '@/views/property/PropertyNav'

export default {
  name: 'PropertyInfo',
  components: { PropertyNav },
  data () {
    return {
      property: {},
      items: ['Hotel', 'Apartments', 'Hostel'],
      isOk: ''
    }
  },
  beforeMount () {
    this.getProperty()
  },
  methods: {
    async getProperty () {
      return await this.$api.property.byId(this.$route.params.id).then((response) => { this.property = response.data })
    }
  }
}
</script>

<style scoped>

</style>
