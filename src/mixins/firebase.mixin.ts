import { auth } from '@/firebase';
import store from '@/store/index';

export default {
  // Global listeners for the app
  created() {
    auth
      .onAuthStateChanged((user) => {
        store.dispatch('onUserConnectedChange', user);
      });
  },
};
