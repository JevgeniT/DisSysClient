<template>
    <div class="container-fluid" data-app>
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <div class="carousel slide" id="carousel-944528">
                    <ol class="carousel-indicators">
                        <li data-slide-to="0" data-target="#carousel-944528" class="active">
                        </li>
                        <li data-slide-to="1" data-target="#carousel-944528">
                        </li>
                        <li data-slide-to="2" data-target="#carousel-944528">
                        </li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" alt="Carousel Bootstrap First" src="https://www.layoutit.com/img/sports-q-c-1600-500-1.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    First Thumbnail label
                                </h4>
                                <p>
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                </p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" alt="Carousel Bootstrap Second" src="https://www.layoutit.com/img/sports-q-c-1600-500-2.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    Second Thumbnail label
                                </h4>
                                <p>
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                </p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" alt="Carousel Bootstrap Third" src="https://www.layoutit.com/img/sports-q-c-1600-500-3.jpg" />
                            <div class="carousel-caption">
                                <h4>
                                    Third Thumbnail label
                                </h4>
                                <p>
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                </p>
                            </div>
                        </div>
                    </div> <a class="carousel-control-prev" href="#carousel-944528" data-slide="prev"><span class="carousel-control-prev-icon"></span> <span class="sr-only">Previous</span></a> <a class="carousel-control-next" href="#carousel-944528" data-slide="next"><span class="carousel-control-next-icon"></span> <span class="sr-only">Next</span></a>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                        <dl>
                            <dt>
                                Description lists
                            </dt>
                            <dd>
                                A description list is perfect for defining terms.
                            </dd>
                            <dt>
                                Euismod
                            </dt>
                            <dd>
                                Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.
                            </dd>
                            <dd>
                                Donec id elit non mi porta gravida at eget metus.
                            </dd>
                            <dt>
                                Malesuada porta
                            </dt>
                            <dd>
                                Etiam porta sem malesuada magna mollis euismod.
                            </dd>
                            <dt>
                                Felis euismod semper eget lacinia
                            </dt>
                            <dd>
                                Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                            </dd>
                        </dl>
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                        <ol>
                            <li class="list-item">
                                Lorem ipsum dolor sit amet
                            </li>
                            <li class="list-item">
                                Consectetur adipiscing elit
                            </li>
                            <li class="list-item">
                                Integer molestie lorem at massa
                            </li>
                            <li class="list-item">
                                Facilisis in pretium nisl aliquet
                            </li>
                            <li class="list-item">
                                Nulla volutpat aliquam velit
                            </li>
                            <li class="list-item">
                                Faucibus porta lacus fringilla vel
                            </li>
                            <li class="list-item">
                                Aenean sit amet erat nunc
                            </li>
                            <li class="list-item">
                                Eget porttitor lorem
                            </li>
                        </ol>
                        <h3>
                            h3. Lorem ipsum dolor sit amet.
                        </h3>
                        <blockquote class="blockquote">
                            <p class="mb-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
                            </p>
                            <footer class="blockquote-footer">
                                Someone famous in <cite>Source Title</cite>
                            </footer>
                        </blockquote>
                    </div>
                    <div class="col-md-4">
                        <v-card
                                class="mx-auto"
                                max-width="344"
                                outlined
                        >
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-row>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn text>Button</v-btn>
                                <v-btn text>Button</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="search.from"
                                    label="Check In"
                                    v-on="on"
                                    readonly
                                    clearable
                                    @click:clear="search.from = null"
                            ></v-text-field>
                        </template>
                        <v-date-picker no-title scrollable
                                v-model="search.from"
                                @change="menu1 = false"
                                :min="minCheckIn"
                        >
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                    <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    :value="search.to"
                                    clearable
                                    label="Check out"
                                    v-on="on"
                                    @click:clear="search.to = null"
                            ></v-text-field>
                        </template>
                        <v-date-picker no-title scrollable
                                v-model="search.to"
                                @change="menu2 = false"
                                :min="minCheckOut"
                                :show-current="true"
                        >
                            <v-spacer></v-spacer>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-btn type="submit" v-on:click="getDates"> Submit</v-btn>
            </v-row>
            <v-alert :value="alert"
                     color="pink"
                     type="error"
                     border="top"
                     transition="slide-y-transition">
                Please choose dates first
            </v-alert>
        </v-container>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr v-if="!hideChoice">
                    <th class="text-left">Room Type</th>
                    <th class="text-left">Sleeps</th>
                    <th class="text-left">Price for x nights</th>
                    <th class="text-left">Your Choices</th>
                    <th class="text-left">Select Rooms</th>
                    <th class="text-left">#</th>
                </tr>
                <tr v-else>
                    <th class="text-left">Room Type</th>
                    <th class="text-left">Sleeps</th>
                    <th class="text-left">#</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data.propertyRooms" v-bind:key="item.id">
                    <td>
                        <a id="rname" class="-bold">
                        <p class="font-weight-bold">{{ item.name }}</p>
                        </a>
                        <v-spacer></v-spacer>
                        <a v-for="i in item.roomFacilities" v-bind:key="i.id">
                            <a id="fname"><i class="fas fa-check">{{i.name}}</i></a><v-spacer></v-spacer>
                        </a>
                    </td>
                    <td>
                        <a v-for="x in item.capacity" v-bind:key="x.id">
                        <i class="fas fa-user"></i>
                    </a>
                    </td>
<!--                    <td>{{ item.capacity }}<i class="fas fa-user"></i> </td>-->
                    <td v-if="!hideChoice">empty</td>
                    <td v-if="!hideChoice">
                        <div class="form-group">
                        <label for="sel1"></label>
                        <select class="form-control" id="sel1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                        </div>
                    </td>
                    <td v-else class="text-center"><v-btn color="primary" @click="alert = true">Show Prices</v-btn></td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
export default {
    name: "App",
    data: () => ({
        menu1: false,
        modal: false,
        menu2: false,
        alert: false,
        data: {},
        data2: {},
        date: null,
        search: {
            from: null,
            to: null,
            propertyId: NaN
        }
    }),
    computed: {
        hideChoice: function () {
            return !this.data2.length;
        },
        minCheckIn() {
            const dayIn = new Date(this.search.from);
            const endDate = new Date(dayIn.getFullYear(), dayIn.getMonth(), dayIn.getDate());
            return endDate.toISOString().slice(0, 10)
        },
        minCheckOut() {
            const dayOut = new Date(this.minCheckIn);
            const endDate = new Date(dayOut.getFullYear(), dayOut.getMonth(), dayOut.getDate() + 3);
            console.log(dayOut)
            console.log(endDate)
            return endDate.toISOString().slice(0, 10)
        }
    },
    beforeMount() {
        this.getProperty(); // fix
    },
    mounted: function () {
        if (alert) {
            this.hideAlert();
        }
    },
    methods: {
        async getProperty() {
            const id = this.$route.params.id;
            const token = localStorage.getItem('jwt')
            const res = await fetch('https://localhost:5001/api/v1.0/property/' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const data = await res.json();
            this.data = data;
        },
        async getDates() {
            const token = localStorage.getItem('jwt')
            this.search.propertyId = this.$route.params.id;
            const res = await fetch('https://localhost:5001/api/v1.0/availability/checkdates', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'
                },
                mode: "cors",
                cache: "default",
                body: JSON.stringify(this.search)
            });
            const data = await res.json();
            this.data2 = data;
        },
        hideAlert: function () {
            window.setInterval(() => {
                this.alert = false;
            }, 3000)
        }
    }
};
</script>

<style scoped>
    #fname{
        font-size: .85em;
    }
    #rname{
    }
</style>
