<template>
<v-container>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field label="name" v-model="extra.name"></v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field label="price"  v-model.number="extra.price"></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="postExtra" text outlined color="blue">Create</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <p v-for="e in extras" v-bind:key="e.id">{{e}}</p>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "Extra",
  data () {
    return {
      extra:{},
      extras: {}
    }
  },
  beforeMount() {
    this.getExtra()
  },
  methods: {
    async getExtra() { // TODO
       return await this.$api.extra.all({pId : this.$route.params.id})
      .then((r)=> {
        if (r.status === 200) {
          this.extras = r.data
        }
      })
    },
    async postExtra() {
      this.extra.propertyId = this.$route.params.id
      return await this.$api.extra.post(JSON.stringify(this.extra))
      .then((r) => {
        if (r.status === 201) {
          this.extras.push(r.data)
          this.extra = {}
        }
      })
    }
  }
}
</script>
