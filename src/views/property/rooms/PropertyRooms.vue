<template>
  <v-container>
    <v-row >
      <v-col cols="12">
          <v-expansion-panels >
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                <template v-slot:actions>
                    <v-icon color="blue" large>mdi-plus</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content >
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-text-field v-model="room.name"
                                  label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-text-field v-model.number="room.size"
                                  label="Size"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-select label="Bed Type" :items="bed" v-model="room.bedTypes" multiple>
                    </v-select>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-text-field v-model.number="room.adultsOccupancy"
                                  label="Adults occupancy"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model.number="room.childOccupancy"
                                  label="Child occupancy"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="room.description"
                                  label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-row dense>
                    <v-col cols="2" v-for="f in facilities" v-bind:key="f.id">
                      <v-checkbox
                          v-model="room.facilityDtos"
                          :label="f.name"
                          :value="f"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-btn text color="primary" outlined @click="createRoom">Save</v-btn>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
         <v-divider></v-divider>
      </v-col>
      <room-component :rooms="rooms">
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
      room: {
        facilityDtos : []
      },
      facilities: {},
      isOk: '',
      property: null,
      bed: ['1 king bed', '1 queen bed', '2 twin beds']
    }
  },
  beforeMount () {
    this.getRooms()
    this.getFacilities()
  },
  methods: {
    async getRooms () {
      return await this.$api.property.byId(this.$route.params.id).then((r) => { this.rooms = r.data.propertyRooms })
    },
    async createRoom () {
      this.room.propertyId = this.$route.params.id
      return await this.$api.rooms.post(JSON.stringify(this.room)).then((r) => {
        if (r.status === 201) {
          this.rooms.push(r.data)
          this.room = {}
        }
      })
    },
    async getFacilities() {
      return await this.$api.facilities.all().then((r)=> {this.facilities = r.data});
    }
  }
}
</script>

<style scoped>
.v-expansion-panel::before {
  box-shadow: none;
}
</style>
