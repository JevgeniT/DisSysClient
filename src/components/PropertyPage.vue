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
                            <div class="text-left">
                                <v-chip
                                        class="ma-2"
                                        secondary
                                >
                                    {{data.type}}
                                </v-chip>
                                {{data.name}}
                                <v-subheader>{{data.address}}, {{data.country}}</v-subheader>
                            </div>
                        </h3>
                        <dl>
                            <dd>
                               {{data.description}}
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
                        <v-chip
                                class="ma-2"
                                color="primary"
                        >
                            10
                        </v-chip>
                        <p v-for="i in reviews" v-bind:key="i.id">
                            {{i.comment}}
                            <v-divider></v-divider>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <v-container id="ctr">
            <v-card max-width="100%"> <v-card-text>
            <v-row>
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                            hide-details
                            :min="1"
                            single-line
                            type="number"
                            label="Guests"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-btn type="submit" id="submit" v-on:click="getDates"> Submit</v-btn>
                </v-col>
            </v-row></v-card-text>
            <v-alert :value="alert"
                     color="pink"
                     type="error"
                     border="top"
                     transition="slide-y-transition">
                Please choose dates first
            </v-alert>
            </v-card>
        </v-container>
        <div class="divTable unstyledTable">
            <div class="divTableHeading">
                <div class="divTableRow">
                    <div class="divTableHead" style="width: 20%">Room type</div>
                    <div class="divTableHead" style="width: 5%">Sleeps</div>
                    <template v-if="!hideChoice">
                        <div class="divTableHead" style="width: 10%">Todays's Price</div>
                        <div class="divTableHead" style="width: 30%">Your Choises</div>
                        <div class="divTableHead" >Select an room </div>
                        <div class="divTableHead"></div>
                    </template>
                    <template v-else>
                        <div style="width: 50%" class="divTableHead"></div>
                        <div style="width: 25%" class="divTableHead"></div>
                    </template>
                </div>
            </div>
            <div class="divTableBody" v-for="item in data.propertyRooms" v-bind:key="item.id">
                <div class="divTableRow">
                    <div class="divTableCell">
                         <input type="hidden" :set="reservation.roomId = item.id">
                        <property-room v-bind:r-id="item.id" :r-name="item.name">
                        </property-room>
                        <p>{{item.bedType}}</p>
                        <a v-for="i in item.roomFacilities" v-bind:key="i.id">
                            <a class="fname"><i class="fas fa-check">{{i.name}}</i></a>
                        </a>
                        <a class="fname"><i class="fas fa-check">{{item.size}} m²</i></a>
                    </div>
                    <div class="divTableCell">
                        <a v-for="x in item.adultsCapacity" v-bind:key="x.id">
                            <i class="fas fa-user"></i>
                        </a>
                    </div>
                    <template v-if="!hideChoice">
                    <div class="divTableCell"></div>
                    <div v-if="!hideChoice" class="divTableCell">
                        <div class="divTableRow"  v-for="d in data2" v-bind:key="d.id" :set="reservation.policy = d.policy.name">
                            {{d.policy.name}}
                        </div>
                    </div>
                    <div v-if="!hideChoice" class="divTableCell">
                        <div v-for="d in data2" class="input-group" v-bind:key="d.name">
                            <label>
                                <select class="custom-select" v-model="reservation.quantity">
                                    <option selected>Choose...</option>
                                    <option v-for="x in d.roomsAvailable" v-bind:key="x.id">{{x}}</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div v-if="!hideChoice" class="divTableCell"><button class="btn btn-primary" type="submit" v-on:click="submitReservation">Reserve</button> </div>
                    </template>
                    <template v-else>
                        <div style="width: 50%" class="divTableCell"></div>
                        <div style="width: 25%" class="divTableCell"><button class="btn btn-primary">Prices</button></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PropertyRoom from "@/components/RoomDetails";

export default {
    name: "App",
    components: {
        PropertyRoom
    },
    data: () => ({
        reservation: {
            roomId: null,
            quantity: null,
            policy: null
        },
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
        },
        days: null,
        reviews: null,
        dialog: false
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
            return endDate.toISOString().slice(0, 10)
        }
    },
    beforeMount() {
        this.getProperty(); // fix
        this.GetReviews();
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
            this.days = (new Date(this.search.to).getDate() - new Date(this.search.from).getDate())
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
            this.data2 = await res.json();
        },
        async GetReviews() {
            const id = this.$route.params.id;
            const token = localStorage.getItem('jwt')
            const res = await fetch('https://localhost:5001/api/v1.0/review/property/' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            this.reviews = await res.json();
        },
        hideAlert: function () {
            window.setInterval(() => {
                this.alert = false;
            }, 3000)
        },
        async submitReservation() {
            console.log(this.reservation.quantity)
            console.log(this.reservation.roomId)
            console.log(this.reservation.policy)
        }
    }
};
</script>

<style scoped>
    .fname{
        font-size: .75rem;
        color: #008009;
    }
    #ctr{
        /*padding-bottom: 2px;*/
        margin-bottom: 10px;
        width: 100%;
        padding-right: 2px;
        padding-left: 2px;
    }
    #submit{
        margin-top: 10px;
    }
    div.unstyledTable {
        width: 100%;
        height: 200px;
        text-align: center;
        border-collapse: collapse;
    }
    .divTable.unstyledTable .divTableCell, .divTable.unstyledTable .divTableHead {
        border: 1px solid #AAAAAA;
        padding: 10px 2px;
    }
    .divTable.unstyledTable .divTableHeading {
        background: #DDDDDD;
    }
    .divTable.unstyledTable .divTableHeading .divTableHead {
        font-weight: normal;
    }
    .unstyledTable .tableFootStyle {
        font-weight: bold;
    }
    /* DivTable.com */
    .divTable{ display: table; }
    .divTableRow { display: table-row; }
    .divTableHeading { display: table-header-group;}
    .divTableCell, .divTableHead { display: table-cell;}
    .divTableHeading { display: table-header-group;}
    .divTableBody { display: table-row-group;}
</style>
