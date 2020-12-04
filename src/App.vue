<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue';
import firebaseMixin from '@/mixins/firebase.mixin';

export default Vue.extend({
  name: 'App',
  mixins: [firebaseMixin],
});
</script>
