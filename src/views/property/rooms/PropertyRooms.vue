<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card elevation="0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-btn class="mx-2" fab dark color="indigo" small>
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                    <v-col
                        cols="8"
                        class="text--secondary">
                      <v-fade-transition leave-absolute>
                <span v-if="open">
                </span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field v-model="room.name"
                    label="Name"
                ></v-text-field>
                <v-text-field v-model.number="room.size"
                              label="Size"
                ></v-text-field>
                <v-select label="Bed Type" :items="bed" v-model="room.bed">
                </v-select>
                <v-text-field v-model.number="room.adultsOccupancy"
                    label="Adults occupancy"
                ></v-text-field>
                <v-text-field v-model.number="room.childOccupancy"
                    label="Child occupancy"
                ></v-text-field>
                <v-text-field v-model="room.description"
                    label="Description"
                ></v-text-field>
                <v-btn text color="primary" @click="createRoom">
                  Save
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <room-component :rooms="rooms" :owner="true">
      </room-component>
    </v-row>
  </v-container>
  </template>
<script>
import RoomComponent from '@/components/RoomComponent'
export default {
  name: 'PropertyRooms',
  components: { RoomComponent },
  data () {
    return {
      rooms: {},
      room: {},
      isOk: '',
      property: null,
      bed: ['Large', 'Single']
    }
  },
  beforeMount () {
    this.getRooms()
  },
  methods: {
    async getRooms () {
      return this.$api.property.byId(this.$route.params.id).then((r) => { this.rooms = r.data.propertyRooms })
    },
    async createRoom () {
      this.room.propertyId = this.$route.params.id
      return this.$api.rooms.post(JSON.stringify(this.room)).then((r) => {
        if (r.status === 201) {
          this.rooms.push(r.data)
          this.room = {}
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
