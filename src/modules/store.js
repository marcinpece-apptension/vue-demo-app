import Vue from 'vue';
import Vuex from 'vuex';

import currencyStore from './currency';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    currency: currencyStore,
  },
});
