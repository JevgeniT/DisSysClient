<template id="app">
    <v-app id="inspire">
        <v-container>
        </v-container>
    </v-app>
</template>
<script>
export default {
    name: "appp",
    data: () => ({
        showPicker: false,
        selectedDate: null,
        date: null
    }),
    methods: {
        closeDateMenu () {
            this.showPicker = false;
            this.selectedDate = this.date ? (this.date) : '';
            console.log(this.selectedDate)
        }
    }
}
</script>
