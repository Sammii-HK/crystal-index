import axios from 'axios';

const defaultState = () => ({
  user: {},
});

export default {
  state: defaultState(),
  namespaced: true,
  mutations: {
    UPDATE_USER(state, payload) {
      // if ([payload.key] !== 'password') state.user[payload.key] = payload.value
      state.user[payload.key] = payload.value
    },
    SET_USER(state, payload) {
      state.user = { ...state.user, ...payload };
    },
    CLEAR_USER(state) {
      Object.assign(state, defaultState())      
    },
  },
  actions: {
    updateUser({ commit }, updatedValues) {
      commit('CLEAR_USER')
      // TODO: password on login saved to store state
      commit('UPDATE_USER', updatedValues)
    },
    clearUser({ commit }) {
      commit('CLEAR_USER')
    },
    getUser({ commit }, { id, token }) {
      let config = {
        headers: { Authorization: 'Bearer ' + token }
      }      
      axios.get(`/api/profile/${id}`, config)
      .then((response) => {
        const user = response.data[0]
        commit('SET_USER', user)
      });
    },
  },
  getters: {
    user: (state) => state,
  }
};
