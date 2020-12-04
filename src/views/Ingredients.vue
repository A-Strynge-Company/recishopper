<template>
  <div id="ingredients">
    <SideNavTemplate>
      <BasicViewTemplate v-on:button-clicked="onMenuButtonClicked($event)">
        <IngredientsList :ingredients="ingredients" />
        <AddIngredient
          :dialog="isDialogOpen"
          v-on:dialog-exited="onDialogExited($event)"
        />
      </BasicViewTemplate>
    </SideNavTemplate>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideNavTemplate from '@/templates/SideNavTemplate.vue';
import BasicViewTemplate from '@/templates/BasicViewTemplate.vue';
import IngredientsList from '@/components/IngredientsList.vue';
import AddIngredient from '@/components/AddIngredient.vue';

import { mapState } from 'vuex';

@Component({
  components: {
    SideNavTemplate,
    BasicViewTemplate,
    IngredientsList,
    AddIngredient,
  },
  computed: {
    ...mapState(['ingredients']),
  },
  methods: {
    onMenuButtonClicked(event: string) {
      console.log('onMenuButtonClicked -> onMenuButtonClicked', event);
      switch (event) {
        case 'add':
          this.$data.isDialogOpen = true;
          break;
        default:
          break;
      }
    },
    onDialogExited(event: string) {
      this.$data.isDialogOpen = false;
      const isValidProduct = event.length === 13;
      if (isValidProduct) {
        console.log('🚀 ~ file50 ~ onDialogExited ~ event', event);
        this.$store.dispatch('onIngredientAdded', event);
      }
    },
  },
  data() {
    return {
      jsondata: null,
      isDialogOpen: false,
    };
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.v-container {
  height: 100%;
  margin-top: 218px;
}
</style>
