import axios from 'axios';

const defaultState = () => ({
  auth_user: {
    token: null,
    id: null,
  } 
})

export default {
  // namespaced: true,
  // initial state
  state: defaultState(),
  mutations: {
    SET_TOKEN(state, token) {
      state.auth_user.token = token;
    },
    CLEAR_STATE(state) {
      Object.assign(state, defaultState())      
      // console.log("state.auth_user", state.auth_user); 
    },
    SET_AUTH_USER(state, payload) {
      state.auth_user.id = payload;
      // console.log("state.auth_user", state.auth_user);
    },
  },
  actions: {
    async setAuthenticatedUser({ commit }, { user }) {     
      await axios.post('/api/login', user).then((response) => {
        commit('CLEAR_STATE');
        commit('SET_TOKEN', response.data.credentials);
        commit('SET_AUTH_USER', response.data.id)
        console.log("login success");
      });
    },
    logOut({ commit }) {
      commit('CLEAR_STATE');
      console.log("logged out");
    },
  },
  getters: {
    isLoggedIn: (state) => state.auth_user,
  },
}
