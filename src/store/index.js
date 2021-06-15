/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

import accountModule from "./modules/account"
import crystalModule from "./modules/crystal"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accountModule,
    crystalModule,
  },
});
