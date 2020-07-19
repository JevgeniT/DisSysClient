<template>
    <v-row justify="center">
        <v-btn
                text
                @click.stop="openModal"
        >
            {{rName}}
        </v-btn>

        <v-dialog
                v-model="dialog"
                max-width="1000px"
        >
            <v-card
                    elevation="24"
                    max-width="100%"
                    class="mx-auto">
                <v-card-title class="headline">{{room.name}}</v-card-title>
                <v-card-text>
                    <div class="col-md-12">
                    <div class="row">
                    <div class="col-md-6">
                        <v-carousel
                                :continuous="false"
                                :show-arrows="false"
                                hide-delimiter-background
                                delimiter-icon="mdi-minus"
                                height="300">
                            <v-carousel-item
                                    v-for="(slide, i) in slides"
                                    :key="i"
                            >
                                <v-sheet
                                        :color="colors[i]"
                                        height="100%"
                                >
                                    <v-row
                                            class="fill-height"
                                            align="center"
                                            justify="center"
                                    >
                                        <div class="display-3">{{ slide }} Slide</div>
                                    </v-row>
                                </v-sheet>
                            </v-carousel-item>
                        </v-carousel>
                    </div>
                    <div class="col-md-6">
                        <span style="font-weight: bold">Room Size: </span> {{room.size}} m²
                        <br>
                        <span style="font-weight: bold">Room Facilities: </span>
                          <p v-for="f in room.roomFacilities" v-bind:key="f.id">
                              <i class="fas fa-check"></i>{{f.name}}
                          </p>
                    </div>
                </div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green darken-1"
                            text
                            @click="dialog = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default { // todo fix modal errors
    name: "RoomDetails",
    data: () => ({
        room: '',
        dialog: false,
        colors: [
            'indigo',
            'warning',
            'pink darken-2',
            'red lighten-1',
            'deep-purple accent-4'
        ],
        slides: [
            'First',
            'Second',
            'Third',
            'Fourth',
            'Fifth'
        ]
    }),
    props: {
        rId: String,
        rName: String
    },
    methods: {
        openModal() {
            this.room = this.GetRoom();
            this.dialog = true;
        },
        async GetRoom() {
            const token = localStorage.getItem('jwt')
            const res = await fetch('https://localhost:5001/api/v1.0/room/' + this.rId, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            this.room = await res.json();
        }
    }
}
</script>

<style scoped>
</style>
