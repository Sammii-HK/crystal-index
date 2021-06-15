import axios from 'axios';

const state = {
  crystals: [] 
}

const mutations = {
  UPDATE_CRYSTALS (state, payload) {
    state.crystals = payload;
  }
}

const actions = {
  getCrystals ({ commit }) {
    axios.get('/api/crystals').then((response) => {
      commit('UPDATE_CRYSTALS', response.data)
    });
  }
}

const getters = {
  crystals: state => state.crystals
}

const crystalsModule = {
  state,
  mutations,
  actions,
  getters
}

export default crystalsModule;
