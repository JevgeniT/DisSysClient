<template>
    <div class="container">
   <div class="row">
       <div class="col">
           <img src="https://via.placeholder.com/400">
       </div>
       <div class="col">
           <img src="https://via.placeholder.com/200">
       </div>
       <div class="row">
           <div class="col">
               <img src="https://via.placeholder.com/200">
           </div>
       </div>
   </div>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            data: {}
        }
    },
    beforeMount() {
        this.getName();
    },
    methods: {
        async getName() {
            const id = this.$route.params.id;
            const token = localStorage.getItem('jwt')
            const res = await fetch('https://localhost:5001/api/v1.0/property/' + id, {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token }
            });
            const data = await res.json();
            this.data = data;
        }
    }
};
</script>

<style scoped>

</style>
