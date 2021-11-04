import axios from 'axios';

const defaultState = () => ({
  auth_user: {
    token: null,
    id: null,
    success: null,
    message: null,
  } 
})

export default {
  // namespaced: true,
  state: defaultState(),
  mutations: {
    CLEAR_STATE(state) {
      Object.assign(state, defaultState())      
    },
    SET_AUTH_USER(state, payload) {
      state.auth_user = payload;
    },
  },
  actions: {
    async setAuthenticatedUser({ commit }, { user }) {     
      await axios.post('/api/login', user).then((response) => {
        commit('CLEAR_STATE');
        commit('SET_AUTH_USER', response.data)
        console.log("Login success:", response.data.message, "🌈");
      });
    },
    logOut({ commit }) {
      commit('CLEAR_STATE');
      console.log("logged out");
    },
  },
  getters: {
    isAuthUser: (state) => state.auth_user,
  },
}
