import axios from 'axios';

const defaultState = () => {
  return {
    crystals: [],
    crystal: {},
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
  },  
  actions: {
    updateCrystal({ commit }, updatedValues) {
      commit('UPDATE_CRYSTAL', updatedValues)
    },
    getCrystal({ commit }, id) {
      axios.get(`/api/crystals/${id}`)
      .then((response) => {
        const crystal = response.data[0]
        commit('UPDATE_CRYSTAL', crystal)
      });
    },
    getCrystals({ commit }) {
      axios.get('/api/crystals')
      .then((response) => {
        commit('UPDATE_CRYSTALS', response.data)
      });
    },
    createCrystal({ commit }, crystal) {
      axios.post('/api/crystals/create', crystal)
      .then((response) => {
        commit('UPDATE_CRYSTAL', response.data)
      });
    },
  },
  getters: {
    crystals: state => state.crystals,
    crystal: state => state.crystal,
  },
}

