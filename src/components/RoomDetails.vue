<template>
    <v-row justify="center">
        <v-btn
                color="primary"
                dark
                @click.stop="dialog = true"
        >
            Open Dialog
        </v-btn>

        <v-dialog
                v-model="dialog"
                max-width="800px"
        >
            <v-card
                    elevation="24"
                    max-width="100%"
                    class="mx-auto">
                <v-card-title class="headline">{{room.name}}</v-card-title>
                <div class="row">
                    <div class="col-md-6" style="margin: 10px">
                        <v-carousel
                                :continuous="false"
                                :show-arrows="false"
                                hide-delimiter-background
                                delimiter-icon="mdi-minus"
                                height="300">
                            <v-carousel-item
                                    v-for="(item,i) in items"
                                    :key="i"
                                    :src="item.src"
                                    reverse-transition="fade-transition"
                                    transition="fade-transition"
                            ></v-carousel-item>
                        </v-carousel>
                    </div>
                    <div class="col-md-6">
                        <v-card-text>
                        <p v-for="f in room.roomFacilities" v-bind:key="f.id">
                            <i class="fas fa-check"></i>{{f.name}}
                        </p>
                        </v-card-text>

                    </div>
                </div>
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
        room: null,
        dialog: false,
        items: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
        ]
    }),
    beforeMount() {
        this.GetRoom();
    },
    methods: {
        async GetRoom() {
            const id = '621d37dc-2713-453e-bbda-08d82341702a'; // TODO
            const token = localStorage.getItem('jwt')
            const res = await fetch('https://localhost:5001/api/v1.0/room/' + id, {
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
