<template>
  <v-app>
    <v-navigation-drawer app class="pt-4" color="grey darken-3" mini-variant>
      <router-link to="/profile">
        <v-avatar :size="36" class="d-block text-center mx-auto mb-9">
          <!-- <v-icon> -->
          <img :src="user.photoURL" />
          <!-- </v-icon> -->
        </v-avatar>
      </router-link>
      <router-link v-for="(avatar, i) in avatars" :key="i" :to="avatar.route">
        <v-avatar :size="20" class="d-block text-center mx-auto mb-9">
          <v-icon> {{ avatar.iconName }} </v-icon>
        </v-avatar>
      </router-link>

      <v-avatar
        @click="signOut"
        :size="20"
        class="d-block text-center mx-auto mb-9"
      >
        <v-icon>mdi-location-exit</v-icon>
      </v-avatar>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  components: {},
  props: {},
  methods: {
    signOut(e) {
      e.stopPropagation();
      firebase.auth().signOut();
      this.$router.push({
        name: 'Login',
      });
    },
  },
  data() {
    return {
      user: {
        photoURL: '',
      },
      avatars: [
        {
          iconName: 'mdi-home',
          route: '/home',
        },
        {
          iconName: 'mdi-calendar-range',
          route: '/plannings',
        },
        {
          iconName: 'mdi-chef-hat',
          route: '/recipes',
        },
        {
          iconName: 'mdi-carrot',
          route: '/ingredients',
        },
      ],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((fbuser) => {
      if (fbuser) {
        this.$data.user = fbuser;
      }
    });
  },
})
export default class SideNavTemplate extends Vue {}
</script>
