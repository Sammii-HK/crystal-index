import axios from 'axios'

const state = {
  user: {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
};

const mutations = {
  UPDATE_USER(state, payload) {
    state.user = payload;
  },
};

const actions = {
  getUser({ context }) {
    axios.post('/login').then((response) => {
      commit('UPDATE_USERS', response.data)
    });
  },
};

const getters = {
  users: state => state.users
};

const accountModule = {
  state,
  mutations,
  actions,
  getters
}

export default accountModule;