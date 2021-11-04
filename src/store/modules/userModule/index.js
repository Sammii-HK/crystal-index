const defaultState = () => ({
  user: {},
});

export default {
  // initial state
  state: defaultState(),
  // namespaced: true,
  mutations: {
    UPDATE_USER(state, payload) {
      state[payload.key] = payload.value
    },
    CLEAR_USER(state) {
      Object.assign(state, defaultState())      
    },
  },
  actions: {
    updateUser({ commit }, updatedValues) {
      commit('CLEAR_USER')
      commit('UPDATE_USER', updatedValues)
    },
    clearUser({ commit }) {
      commit('CLEAR_USER')
    },
  },
  getters: {
    isAdmin: (state) => state.roles.includes('admin'),
    user: (state) => state,
    // isLoggedIn: (state) => state.isLoggedIn,
  },
};
