<template>
  <v-row class="fill-height">
    <v-col>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{room.name}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        :value="newDates"
                        filled
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  <v-text-field
                      label="Rooms available"
                      v-model.number="createdDate.roomsAvailable"
                      required
                  ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model.number="createdDate.pricePerNightForAdult" label="Price per night for adult" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Price per night for child"
                        v-model.number="createdDate.pricePerNightForChild"
                        required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-radio label="Price per night" v-model="createdDate.pricePerNight" required></v-radio>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Close</v-btn>
              <v-btn color="blue darken-1" text @click="createDates">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-sheet height="600">
        <v-toolbar
            flat
        >
          <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-calendar
            ref="calendar"
            v-model="value"
            color="primary"
            type="month"
            :events="events"
            @mousedown:day="startTime"
            @mousemove:day="mouseMove"
            @mouseup:day="endDrag"
        >
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import helpers from "@/services/helpers";

export default {
  name: 'Calendar',
  data: () => ({
    value: '',
    events: [],
    colors: ['#008003', '#3f51b5'],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    createdDate: {},
    dialog: false
  }),
  props: {
    room: {}
  },
  beforeMount() {
    this.getRoomDates()
  },
  mounted() {
    this.$refs.calendar.checkChange()

  },
  computed: {
    newDates () {
      if (this.events.length>0){
        return helpers.monthAndDay(this.events[0].start, this.events[0].end)
      }
    }
  },
  methods: {
    async getRoomDates () {
      await this.$api.dates.allFor({ rId: this.room.id }).then((r) => {
        if (r.status===200) {
          for (var i = 0; i < r.data.length; i++) {
            const date = r.data[i]
            this.pushEvent(date)
          }
        }
      }).catch(e=>console.log(e))
    },
    async createDates () {
      this.createdDate.roomId = this.$route.params.id
      this.createdDate.from = new Date(this.createEvent.start)
      this.createdDate.to = new Date(this.createEvent.end)

      this.createdDate.active = true
      return await this.$api.dates.post(JSON.stringify(this.createdDate)).then((r) => {
        if (r.status === 201) {
          this.dialog = false
          // this.pushEvent(r.data)
          this.clearEvent()
        }
      })
    },
    pushEvent (event) {
     this.events.push({
       name: this.room.name,
       start: new Date(event.from),
       end: new Date(event.to),
       color: this.colors[0],
       childPrice: event.pricePerNightForChild,
       adultPrice: event.pricePerNightForAdult,
       roomsAvailable: event.roomsAvailable
     })
    },
    startTime (tms) {
      const mouse = this.toTime(tms)
      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start
        this.dragTime = mouse - start
      } else {
        this.createStart = this.roundTime(mouse)
        this.createEvent = {
          name: this.room.name,
          color:this.colors[0],
          start: this.createStart,
          end: this.createStart,
          timed: false,
        }
        this.events.push(this.createEvent)
      }
    },
    mouseMove (tms) {
      const mouse = this.toTime(tms)
      if (this.createEvent && this.createStart !== null) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.createStart)
        const max = Math.max(mouseRounded, this.createStart)
        this.createEvent.start = min
        this.createEvent.end = max
      }
    },
    endDrag () {
      this.dialog = true
     },
    clearEvent() {
      this.dragTime = null
      this.dragEvent = null
      this.createEvent = null
      this.createStart = null
    },
    close() {
      this.events.pop()
      this.dialog = false
      this.clearEvent()
    },
    roundTime (time, down = true) {
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000
      return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
    },
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    },prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    setToday () {
      this.value = ''
    }
  }
}
</script>

<style scoped>

</style>