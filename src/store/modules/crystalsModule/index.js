import axios from 'axios';

const defaultState = () => ({
  crystals: [],
  crystal: {},
})

export default {
  state: defaultState(),
  mutations: {
    UPDATE_CRYSTALS (state, payload) {
      state.crystals = payload;
    },
    UPDATE_CRYSTAL (state, payload) {
      state.crystal = payload
    },
    CLEAR_STATE(state) {
      Object.assign(state, defaultState())      
    },
  },  
  actions: {
    updateCrystalState({ commit }, updatedValues) {
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
        commit('CLEAR_STATE');
        commit('UPDATE_CRYSTALS', response.data)
      });
    },
    createCrystal({ commit }, crystal) {
      axios.post('/api/crystals/create', crystal)
      .then((response) => {
        commit('CLEAR_STATE');
        commit('UPDATE_CRYSTAL', response.data)
      });
    },
    updateCrystal({ commit }, crystal, token) {
      let config = {
        headers: { token }
      }
      axios.put(`/api/crystals/${crystal.id}`, crystal, config)
      .then((response) => {
        commit('CLEAR_STATE');
        commit('UPDATE_CRYSTAL', response.data)
      });
    },
  },
  getters: {
    crystals: state => state.crystals,
    crystal: state => state.crystal,
  },
}

