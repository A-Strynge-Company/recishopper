<template>
  <div id="home">
    <SideNavTemplate :transclusions="['HomeSweetHome']">
      <template>
        <div id="homeContent">
          <div>Home Sweet Home</div>
          <img src="@/assets/recishopper-1024.png" id="logo" />
        </div>
      </template>
    </SideNavTemplate>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNavTemplate from '@/templates/SideNavTemplate.vue';

@Component({
  methods: {},
  components: {
    SideNavTemplate,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
#logo {
  width: 65%;
  max-width: 250px;
}

#homeContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
