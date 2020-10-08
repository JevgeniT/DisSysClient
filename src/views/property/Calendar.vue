<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{room.name}}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                       todo
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model.number="createdDate.pricePerNightForAdult" label="Price per night for adult" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="Price per night for child"
                            v-model.number="createdDate.pricePerNightForChild"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                            label="Rooms available"
                            v-model.number="createdDate.roomsAvailable"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-radio label="Price per night" v-model="createdDate.pricePerNight" required></v-radio>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                            v-model="createdDate.policyDtos"
                            :items="policies"
                            item-text="name"
                            label="Policy"
                            multiple
                            required
                            return-object
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="createDates">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @mousedown:day="startTime"
            @mousemove:day="mouseMove"
            @mouseup:day="endMove"
            @change="updateRange"
        ></v-calendar>
        <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
        >
          <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
          >
            <v-toolbar
                :color="selectedEvent.color"
                dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.roomName"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text v-if="events.length>0">
              <p>Adults price : {{selectedEvent.adultPrice}}</p>
              <p>Child price : {{selectedEvent.childPrice}}</p>
              <p>Rooms available : {{selectedEvent.roomsAvailable}}</p>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Calendar',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'red'],
    names: ['x'],
    dragEvent: null,
    dragStart: null,
    createEvent: {},
    createStart: null,
    createEnd: null,
    extendOriginal: null,
    value: '',
    dialog: false,
    policyId: null,
    createdDate: {}
  }),
  props: {
    room: {}
  },
  beforeMount () {
    this.getRoomDates()
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  created () {
    this.$store.dispatch('policyModule/loadData', this.room.propertyId)
  },
  computed: mapState({
    policies: state => state.policyModule.policies
  }),
  methods: {
    async getRoomDates () {
      await this.$api.dates.allFor({ rId: this.room.id }).then((r) => {
        if (r.data.length === 0) return
        for (var i = 0; i < r.data.length; i++) {
          const date = r.data[i]
          this.pushEvent(date, 'blue')
        }
      })
    },
    async createDates () {
      this.createdDate.roomId = this.$route.params.id
      this.createdDate.from = new Date(this.createEvent.start).toISOString()
      this.createdDate.to = new Date(this.createEvent.end).toISOString()
      this.dialog = false
      this.createdDate.active = true
      this.$api.dates.post(JSON.stringify(this.createdDate)).then((r) => {
        if (r.status === 200) {
          this.pushEvent(this.createdDate, 'red')
        }
      })
    },
    pushEvent (event, color) {
      this.events.push({
        name: event.roomName,
        start: event.from,
        end: event.to,
        color: color,
        childPrice: event.pricePerNightForChild,
        adultPrice: event.pricePerNightForAdult,
        roomsAvailable: event.roomsAvailable
      })
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    rndElement (arr) {
      return arr[this.rnd(0, arr.length - 1)]
    },
    startTime (tms) {
      const mouse = this.toTime(tms)
      this.createStart = this.roundTime(mouse)
      this.createEvent = {
        name: this.room.name,
        color: this.rndElement(this.colors),
        start: this.createStart,
        // end: new Date(this.createStart),
        timed: true
      }
      // this.events.push(this.createEvent)
    },
    endMove (tms) {
      this.createEvent.end = this.toTime(tms)
      // this.events.push(this.createEvent)
      this.dialog = true
    },
    extendBottom (event) {
      this.createEvent = event
      this.createStart = event.start
      this.extendOriginal = event.end
    },
    mouseMove (tms) {
      const mouse = this.toTime(tms)
      if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)
        this.createEvent.start = min
        this.createEvent.end = max
        // console.log(new Date(this.createEvent.start).toDateString() + ' ' + new Date(this.createEvent.end).toDateString())
        // console.log(this.createEvent.start + ' - ' + this.createEvent.end)
      }
    },
    roundTime (time, down = true) {
      // console.log(new Date(time).toDateString())
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000

      return down
        ? time - time % roundDownTime
        : time + (roundDownTime - (time % roundDownTime))
    },
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    }
  }
}
</script>
