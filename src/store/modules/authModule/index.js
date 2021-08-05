import axios from 'axios';

const defaultState = () => ({ 
  token: null,
  user: {},
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
      console.log("state.token", state.token);
    },
  },
  actions: {
    async setAuthenticatedUser({ commit, dispatch }, { user }) {     
      await axios.post('/api/login', user).then((response) => {
        console.log("response", response);
        commit('CLEAR');
        commit('SET_TOKEN', response.data.credentials);
        dispatch('updateUser', user);
        console.log("login success");
      });
    },
  },
  getters: {
    // isAuthorised: (state) => !!state.token,
    isLoggedIn: (state) => state.token,
    // isLoggedIn: (state) => state.response.success,
  },
}
