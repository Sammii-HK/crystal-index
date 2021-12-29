import axios from 'axios';
import router from '../../../router';

const defaultState = () => ({
  crystals: [],
  crystal: {},
})

export default {
  state: defaultState(),
  namespaced: true,
  mutations: {
    UPDATE_CRYSTALS (state, payload) {
      state.crystals = payload;
    },
    UPDATE_CRYSTAL (state, payload) {
      state.crystal = payload;
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
        const crystal = response.data;
        
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
    createCrystal({ commit },  { crystal, image, token }) {
      let config = {
        headers: { Authorization: 'Bearer ' + token }
      }
      // Create a new form instance
      const form = new FormData();

      if (image) form.append('image', image.file, image.name);
      form.append('crystal', JSON.stringify(crystal)); 

      axios.post('/api/crystals/create', form, config)
      .then((response) => {
        commit('CLEAR_STATE');
        commit('UPDATE_CRYSTAL', response.data)
        router.push(`/crystals/${response.data.id}`)
      });
    },
    updateCrystal({ commit }, { crystal, token } ) {
      let config = {
        headers: { Authorization: 'Bearer ' + token }
      }
      axios.put(`/api/crystals/${crystal.id}`, crystal, config)
      .then((response) => {
        commit('CLEAR_STATE');
        commit('UPDATE_CRYSTAL', response.data[0])
      });
    },
  },
  getters: {
    crystals: state => state.crystals,
    crystal: state => state.crystal,
  },
}

