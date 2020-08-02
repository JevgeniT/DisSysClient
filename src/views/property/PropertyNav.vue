<template>
    <v-card>
    <v-navigation-drawer
            v-model="toggle"
            fixed app
            expand-on-hover
            v-bind:height="325"
    >
<!--        <v-toolbar :color="$root.themeColor" class="toolbar">-->
<!--            <router-link :to="{ name: 'Home' }">-->
<!--            </router-link>-->
<!--            <router-link :to="{ name: 'Home' }" class="text">-->
<!--                Vue Admin Template-->
<!--            </router-link>-->
<!--        </v-toolbar>-->
        <v-list dense>
            <v-list-item>
                <v-list-item-content @click="changeRoute('Info', 1)">
                    <v-list-item-title>
                        Main
                    </v-list-item-title>
                    <!--                <v-list-tile-title :class="[{'active': selectedIndex === 1}, 'item-title' ]" >{{ $t('dashboard') }}</v-list-tile-title>-->
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content @click="changeRoute('Rooms', 2)">
                    <v-list-item-title>
                        Rooms
                    </v-list-item-title>
                    <!--                <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]"> {{ $t('calendar') }}</v-list-tile-title>-->
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        Reservations
                    </v-list-item-title>
                    <!--                <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]"> {{ $t('calendar') }}</v-list-tile-title>-->
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        Calendar
                    </v-list-item-title>
                    <!--                <v-list-tile-title :class="[{'active': selectedIndex === 2}, 'item-title' ]"> {{ $t('calendar') }}</v-list-tile-title>-->
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      selectedIndex: 1
    }
  },

  methods: {
    changeRoute (routeName, selectedIndex) {
      this.selectedIndex = selectedIndex
      return this.$router.push({ name: routeName })
    }
  }
}
</script>

<style scoped>
    .toolbar {
        font-weight: bold;
        font-size: 18px;
    }

    .toolbar .text {
        padding-left: 15px;
        color: white;
        text-decoration:none;
    }

    .item-title {
        font-size: 17px;
        font-weight: 500;
    }
    .item-sub-title {
        font-size: 15px;
        font-weight: 500;
    }

    .active {
        font-weight: bold;
    }
</style>
