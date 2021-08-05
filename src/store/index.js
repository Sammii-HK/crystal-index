import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
import crystalsModule from "./modules/crystalsModule"
import authModule from "./modules/authModule"
import userModule from "./modules/userModule"
import locationsModule from "./modules/locationsModule"

axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'https://gabbyblog.herokuapp.com/';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crystalsModule,
    authModule,
    userModule,
    locationsModule,
  },
  plugins: [createPersistedState()],
});
