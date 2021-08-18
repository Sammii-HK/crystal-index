import axios from 'axios';

const defaultState = () => ({ 
  token: null,
  auth_user: {},
})

export default {
  // namespaced: true,
  state: defaultState(),
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      console.log("state", state);
      console.log("state.token", state.token);
    },
    CLEAR_TOKEN(state) {
      state = defaultState();
      console.log("state", state);
    },
    AUTH_USER_UPDATE(state, payload) {
      state.auth_user[payload.key] = payload.value
    },
  },
  actions: {
    async setAuthenticatedUser({ commit }, { user }) {     
      await axios.post('/api/login', user).then((response) => {
        console.log("response", response);
        commit('CLEAR');
        commit('SET_TOKEN', response.data.credentials);
        // dispatch('updateUser', user);
        commit('AUTH_USER_UPDATE', user)
        console.log("login success");
      });
    },
    logOut({ commit }) {
      // commit('CLEAR')
      commit('CLEAR_TOKEN')
      // commit('SET_TOKEN', null, { root: true })
      console.log("logged out");
      // router.push('/');
    },
  },
  getters: {
    // isAuthorised: (state) => !!state.token,
    isLoggedIn: (state) => state.token,
    authUser: (state) => state.auth_user
    // isLoggedIn: (state) => state.response.success,
  },
}
