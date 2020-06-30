<template id="app">
    <v-app id="inspire">
        <v-container>
            <v-row>
                <v-col cols=12 md="4">
                    <v-menu
                            v-model="showPicker"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="selectedDate"
                                    label="date"
                                    prepend-icon="mdi-calendar-range"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="date" @input="closeDateMenu"></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
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
