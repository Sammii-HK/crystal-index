import Vue from "vue";
import Vuex from "vuex";
import crystalsModule from "./modules/crystalsModule"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crystalsModule,
  },
});
