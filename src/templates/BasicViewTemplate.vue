<template>
  <v-card class="overflow-hidden">
    <!-- BACKGROUND IMAGE -->
    <v-app-bar
      absolute
      color="#6A76AB"
      shrink-on-scroll
      prominent
      src="https://c.pxhere.com/photos/f2/cf/greens_onion_spices_vegetables_food_kitchen_cooking_cutting_board-988557.jpg!d"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <!-- TITLE -->
      <v-toolbar-title>My ingredients</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- SEARCH BTN -->
      <v-btn icon v-on:click="$emit('button-clicked', 'search')">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- ADD BTN -->
      <v-btn icon v-on:click="$emit('button-clicked', 'add')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- OPTIONS BTN -->
      <v-btn icon v-on:click="$emit('button-clicked', 'options')">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <!-- TABS -->
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab v-on:click="$emit('tab-clicked', 'All')">All</v-tab>
          <v-tab v-on:click="$emit('tab-clicked', 'Cat 1')">Cat 1</v-tab>
          <v-tab v-on:click="$emit('tab-clicked', 'Cat 2')">Cat 2</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-3" class="overflow-y-auto">
      <v-container id="slot-container">
        <!-- SLOT -->
        <slot />
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
  props: {},
  methods: {},
  data() {
    return {
      temp: null,
    };
  },
})
export default class BasicViewTemplate extends Vue {}
</script>

<style scoped>
#slot-container {
  margin-top: 250px;
}
</style>
