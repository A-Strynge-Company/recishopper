<template>
  <div id="AddIngredient">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline"> Add Ingredient </v-card-title>

        <!-- ENTER BARCODE -->
        <v-card-text>
          <v-text-field
            outlined
            label="Barcode"
            :rules="rules"
            v-model="barcode"
          ></v-text-field>
          <v-btn color="primary" @click="search(barcode)"
            ><v-icon dark> mdi-magnify </v-icon></v-btn
          >
          <!-- SCAN BARCODE -->
          <div>or</div>
          <v-btn depressed disabled>
            <v-icon dark> mdi-barcode-scan </v-icon>
            Scan Barcode
          </v-btn>
        </v-card-text>
        <!-- PRODUCT PREVIEW -->
        <div id="ingredientPreview" v-if="preview">
          <v-divider></v-divider>
          <IngredientsList :ingredients="[preview]" />
        </div>

        <v-divider></v-divider>
        <!-- ACTIONS -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-on:click="$emit('dialog-exited', barcode)"> Add </v-btn>
          <v-btn color="error" v-on:click="$emit('dialog-exited', 'cancel')">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IngredientsList from '@/components/IngredientsList.vue';
import { get } from 'lodash';
import off from '../mixins/openFoodFacts.mixin';

@Component({
  components: { IngredientsList },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: [(v: string) => v.length === 13 || 'Barcode is 13 characters'],
      preview: null,
      notFound: false,
      barcode: '',
    };
  },
  methods: {
    async search(barcode: string) {
      // console.log('search trigger', this.$data.barcode);
      const product = await off.methods.getOneProduct(barcode);
      console.log('🚀 ~ f~ product', product);
      const found = get(product, ['data', 'status'], 0) === 1;
      if (found) {
        this.$data.preview = get(product, ['data', 'product']);
        console.log('🚀 ~ f9 ~ search ~ his.$data.preview', this.$data.preview);
      } else {
        this.$data.notFound = true;
      }
    },
  },
})
export default class AddIngredient extends Vue {}
</script>

<style scoped>
</style>
