import axios from 'axios';

export default {
  namespaced: true,
  state: {
    token: '',
    authErrorMessage: '',
    authSuccess: '',
  },
  getters: {
    getToken: (state) => state.token,
    getAuthErrorMessage: (state) => state.authErrorMessage,
    getAuthSuccess: (state) => state.authSuccess,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem('token', token.toString());
    },
    SET_AUTH_SUCCESS: (state, authSuccess) => {
      state.authSuccess = authSuccess;
    },
    SET_AUTH_ERROR_MESSAGE: (state, authErrorMessage) => {
      state.authErrorMessage = authErrorMessage;
    },
  },
  actions: {
    async getDataToken({ commit }, loginData) {
      axios
        .post('http://45.12.239.156:8081/api/login', loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          commit('SET_TOKEN', response.data.token);
          commit('SET_AUTH_SUCCESS', true);
        })
        .catch((error) => {
          commit('SET_AUTH_ERROR_MESSAGE', error.response.data.message);
          commit('SET_AUTH_SUCCESS', false);
        });
    },
  },
};