
<template>
    <div id="app">
        <div class="container form-inline col-lg">
        <form @submit.prevent="createPost" >
            <input class="form-control col-xs-4"  v-model="post.input" placeholder="destination">
            <input class="form-control col-xs-4" type="date" v-model="post.from" placeholder="check-in ">
            <input class="form-control col-xs-4" type="date" v-model="post.to" placeholder="check-out ">
            <input class="form-control col-xs-4" type="number" v-model="post.adults" placeholder="Adults">
            <v-btn class="ma2" type="submit">Search</v-btn>
        </form>
        </div>
      <div class="carditem">
           <v-card v-for="d in data"  v-bind:key="d.id" class="mx-auto" outlined>
               <v-list-item three-line>
               <v-list-item-avatar tile size="150" color="grey">
                   <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
               </v-list-item-avatar>
                   <div class="one">
                    <v-list-item-content>
                       <v-list-item-title class="headline mb-0"><h4>{{d.propertyName}}</h4> </v-list-item-title>
                       <v-list-item-subtitle> {{d.propertyLocation}}, {{d.address}} </v-list-item-subtitle>
                   </v-list-item-content>
              </div>
               <v-card-actions>
                   <v-btn text id="checkbutton"><router-link :to="{name:'propertyInfo', params:{id: d.id}}" >Select room </router-link></v-btn>
               </v-card-actions>
               </v-list-item>
           </v-card>
      </div>
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {
            post: {},
            data: {}
        };
    },
    beforeMount() {
        // this.getUserLocation();
    },
    methods: {
        async createPost() {
            const request = new Request(
                "https://localhost:5001/api/v1.0/property/find",
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors",
                    cache: "default",
                    body: JSON.stringify(this.post)
                }
            );
            const res = await fetch(request);
            const data = await res.json();
            this.data = data;
        },
        async getUserLocation() { //    todo offer place in current location
            const request = new Request(
                "http://ip-api.com/json",
                {
                    method: "GET"
                }
            );
            const response = await fetch(request);
            const location = await response.json();
        }

    }
};
</script>
<style>
    .one{
        padding: 25px;
        margin-bottom: 56px;
    }
    #checkbutton{
        margin-right: 10px;
    }
</style>
