<template>
  <div id="IngredientsList">
    <v-card
      v-for="ing in ingredients"
      :key="ing.id"
      elevation="2"
      :loading="false"
      outlined
      shaped
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="headline"
            v-text="ing.product_name_fr"
          ></v-card-title>

          <v-card-text>
            <v-img
              v-if="ing.nutrition_grades_tags[0] === 'a'"
              class="nutriscore"
              src="@/assets/Nutri-score-A.svg"
            ></v-img>
            <v-img
              v-else-if="ing.nutrition_grades_tags[0] === 'b'"
              class="nutriscore"
              src="@/assets/Nutri-score-B.svg"
            ></v-img>
            <v-img
              v-else-if="ing.nutrition_grades_tags[0] === 'c'"
              class="nutriscore"
              src="@/assets/Nutri-score-C.svg"
            ></v-img>
            <v-img
              v-else-if="ing.nutrition_grades_tags[0] === 'd'"
              class="nutriscore"
              src="@/assets/Nutri-score-D.svg"
            ></v-img>
            <v-img
              v-else-if="ing.nutrition_grades_tags[0] === 'e'"
              class="nutriscore"
              src="@/assets/Nutri-score-E.svg"
            ></v-img>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> Edit </v-btn>
            <v-btn color="deep-purple lighten-2" text> Remove </v-btn>
          </v-card-actions>
        </div>

        <v-avatar class="ma-3 productThumbnail" size="85" tile>
          <v-img :src="ing.image_small_url"></v-img>
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    ingredients: Array,
  },
})
export default class IngredientsList extends Vue {}
</script>

<style scoped>
.v-card {
  margin: 15px;
}

.v-card__title {
  font-size: 0.9rem !important;
}

.nutriscore {
  height: 40px;
  width: 75px;
}

.headline {
  /* white-space: nowrap; */
}

#IngredientsList {
  /* margin-top: 250px; */
}
</style>
