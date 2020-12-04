import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/firebase';
import firebase from 'firebase';
import off from '@/mixins/openFoodFacts.mixin';
import { get } from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    unsubscribe: () => null,
    userId: '',
    ingredients: new Array<any>(),
    recipes: [],

    user: {
      ingredients: [''],
    },
  },
  getters: {
    userId: (state) => state.userId,
    user: (state) => state.user,

  },
  mutations: {
    clearUser: (state) => {
      state.user = { ingredients: [''] };
      state.userId = '';
      state.unsubscribe();
    },
    setUserId: (state, userId) => {
      state.userId = userId;
    },
    setIngredients: (state, ingredients) => {
      state.ingredients = ingredients;
    },
    setRecipes: (state, recipes) => {
      state.recipes = recipes;
    },
    setUnsubscribe: (state, unsubscribe) => {
      state.unsubscribe = unsubscribe;
    },
    setUser: (state, user) => {
      state.user = user;
    },

  },
  actions: {
    onUserConnectedChange: async ({ commit, state }, user) => {
      if (user == null) {
        commit('clearUser');
        return;
      }
      const userRef = db.collection('users').doc(user.uid);

      const unsubcribe = userRef.onSnapshot(async (doc) => {
        commit('setUserId', doc.id);
        commit('setUser', doc.data());

        let ingredients = await off.methods.getMissingsProducts(
          state.ingredients,
          get(state, ['user', 'ingredients'], []),
        );
        ingredients = ingredients
          .map((i) => get(i, ['data', 'product']))
          .concat(state.ingredients);
        commit('setIngredients', ingredients);
      });
      commit('setUnsubscribe', unsubcribe);
    },
    onIngredientAdded: async ({ state }, ingredientId) => {
      console.log('adding ingredient');
      const userRef = db.collection('users').doc(state.userId);
      userRef.update({
        ingredients: firebase.firestore.FieldValue.arrayUnion(ingredientId),
      });
    },
  },
});

export default store;
