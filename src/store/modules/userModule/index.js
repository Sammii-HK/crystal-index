const defaultState = () => {
  return {
    username: '',
    password: '',
    // email: '',
    // roles: [],
    // id: null,
  }
}

export default {
  state: defaultState(),
  // namespaced: true,
  mutations: {
    USER_UPDATE(state, payload) {
      state[payload.key] = payload.value
    },
    CLEAR(state) {
      Object.assign(state, defaultState())
    },
  },
  actions: {
    updateUser({ commit }, updatedValues) {
      commit('USER_UPDATE', updatedValues)
      // commit('CLEAR')
    },
  },
  getters: {
    isAdmin: (state) => state.roles.includes('admin'),
    user: (state) => state,
    // isLoggedIn: (state) => state.isLoggedIn,
  },
};
