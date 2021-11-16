import axios from 'axios';

const defaultState = () => {
  return {
    locations: [],
    location: {},
  }
}

export default {
  state: defaultState(),
  namespaced: true,
  mutations: {
    UPDATE_LOCATIONS (state, payload) {
      state.locations = payload;
    },
    UPDATE_LOCATION (state, payload) {
      state.location = payload
    },
    // USER_UPDATE(state, payload) {
    //   state[payload.key] = payload.value
    // },
  },  
  actions: {
    updateLocation({ commit }, updatedValues) {
      commit('UPDATE_LOCATION', updatedValues)
    },
    getLocation ({ commit }, id) {
      axios.get(`/api/locations/${id}`).then((response) => {
        const location = response.data[0]
        
        console.log("getLocation", location);
        commit('UPDATE_LOCATION', location)
      });
    },
    getLocations ({ commit }) {
      axios.get('/api/locations').then((response) => {
        commit('UPDATE_LOCATIONS', response.data)
      });
    },
  },
  getters: {
    locations: state => state.locations,
    location: state => state.location,
  },
}

