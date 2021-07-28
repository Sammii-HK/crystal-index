import axios from 'axios';

const defaultState = () => {
  return {
    crystals: [],
    crystal: {
      id: null,
    },
  }
}

export default {
  state: defaultState(),
  mutations: {
    UPDATE_CRYSTALS (state, payload) {
      state.crystals = payload;
    },
    UPDATE_CRYSTAL (state, payload) {
      state.crystal = payload
    },
    // USER_UPDATE(state, payload) {
    //   state[payload.key] = payload.value
    // },
  },  
  actions: {
    updateCrystal({ commit }, updatedValues) {
      commit('UPDATE_CRYSTAL', updatedValues)
    },
    getCrystal ({ commit }, id) {
      axios.get(`/api/crystals/${id}`).then((response) => {
        const crystal = response.data[0]
        
        console.log("getCrystal", crystal);
        commit('UPDATE_CRYSTAL', crystal)
      });
    },
    getCrystals ({ commit }) {
      axios.get('/api/crystals').then((response) => {
        commit('UPDATE_CRYSTALS', response.data)
      });
    },
  },
  getters: {
    crystals: state => state.crystals,
    crystal: state => state.crystal,
  },
}

