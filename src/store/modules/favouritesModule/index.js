import axios from 'axios';
// import router from '../../../router';

const defaultState = () => ({
  favourites: {},
});

export default {
  state: defaultState(),
  namespaced: true,
  mutations: {
    // UPDATE_USER(state, payload) {
    //   state[payload.key] = payload.value
    // },
    // CLEAR_USER(state) {
    //   Object.assign(state, defaultState())      
    // },
  },
  actions: {
    async createFavourite({ commit }, favouritedCrystal) {
      await axios.post('/api/favourites/addCrystal', favouritedCrystal).then((response) => {
        return response;
      });
    },
    async removeFavourite({ commit }, unfavouritedCrystal) {
      await axios.delete('/api/favourites/removeCrystal', { data: unfavouritedCrystal }).then((response) => {
        return response;
      });
    },
  },
  getters: {
    // user: (state) => state,
  }
};
