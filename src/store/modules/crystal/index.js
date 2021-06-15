/* eslint-disable */
import axios from 'axios'

const state = {
  crystals: [],
};

const mutations = {
  UPDATE_CRYSTALS(state, payload) {
    state.crystals = payload;
  },
};

const actions = {
  getCrystals({ context }) {
    axios.get('/api/crystals').then((response) => {
      commit('UPDATE_CRYSTALS', response.data)
    });
  },
};

const getters = {
  crystals: state => state.crystals
};

const crystalModule = {
  state,
  mutations,
  actions,
  getters
}

export default crystalModule;